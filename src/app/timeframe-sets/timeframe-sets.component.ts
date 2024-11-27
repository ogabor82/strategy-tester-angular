import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { TimeframeSet } from './timeframe-set.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SessionConfigurationService } from '../session-configuration/session-configuratio.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-timeframe-sets',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatIconModule],
  templateUrl: './timeframe-sets.component.html',
  styleUrl: './timeframe-sets.component.scss',
})
export class TimeframeSetsComponent implements OnInit {
  timeframeSets = signal<TimeframeSet[]>([]);
  isFetching = signal(false);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private sessionConfigurationService = inject(SessionConfigurationService);

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.httpClient
      .get<TimeframeSet[]>(
        'http://127.0.0.1:5000/timeframe-sets-with-timeframes'
      )
      .subscribe({
        next: (data) => {
          this.timeframeSets.set(data);
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

  get selectedTimeframeSet(): TimeframeSet | undefined {
    return this.sessionConfigurationService.getTimeframeSet();
  }

  selectTimeframeSet(id: number) {
    const timeframeSet = this.timeframeSets().find((t) => t.id === id);
    if (timeframeSet) {
      this.sessionConfigurationService.setTimeframeSet(timeframeSet);
    }
  }
}
