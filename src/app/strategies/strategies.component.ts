import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Strategy } from './strategy.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { map } from 'rxjs';
import { SessionConfigurationService } from '../session-configuration/session-configuratio.service';
@Component({
  selector: 'app-strategies',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatIconModule],
  templateUrl: './strategies.component.html',
  styleUrl: './strategies.component.scss',
})
export class StrategiesComponent implements OnInit {
  strategies = signal<Strategy[]>([]);
  isFetching = signal(false);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private sessionConfigurationService = inject(SessionConfigurationService);

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.httpClient
      .get<Strategy[]>('http://127.0.0.1:5000/strategies')
      .pipe(
        map((data) => {
          return data.map((strategy, index) => ({
            ...strategy,
            is_favorite: index % 2 === 0,
          }));
        })
      )
      .subscribe({
        next: (data) => {
          this.strategies.set(data);
        },
        complete: () => {
          this.isFetching.set(false);
        },
        error: (error) => {
          console.error(error);
          this.isFetching.set(false);
        },
      });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  get selectedStrategy(): Strategy | undefined {
    return this.sessionConfigurationService.getStrategy();
  }

  selectStrategy(strategyId: number) {
    const strategy = this.strategies().find(
      (strategy) => strategy.id === strategyId
    );
    if (strategy) {
      this.sessionConfigurationService.setStrategy(strategy);
    }
  }
}
