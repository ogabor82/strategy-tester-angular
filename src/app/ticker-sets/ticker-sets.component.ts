import { Component, signal, inject, OnInit, DestroyRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TickerSet } from './ticker-set.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { SessionConfigurationService } from '../session-configuration/session-configuration.service';
import { MatChipsModule } from '@angular/material/chips';
@Component({
  selector: 'app-ticker-sets',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatIconModule, MatChipsModule],
  templateUrl: './ticker-sets.component.html',
  styleUrl: './ticker-sets.component.scss',
})
export class TickerSetsComponent implements OnInit {
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private sessionConfigurationService = inject(SessionConfigurationService);
  tickerSets = signal<TickerSet[]>([]);
  isFetching = signal(false);

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.httpClient
      .get<TickerSet[]>('http://127.0.0.1:5000/ticker-sets')
      .subscribe({
        next: (data) => {
          this.tickerSets.set(data);
        },
        complete: () => {
          this.isFetching.set(false);
        },
      });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  get selectedTickerSet(): TickerSet | undefined {
    return this.sessionConfigurationService.getTickerSet();
  }

  selectTickerSet(name: string) {
    const tickerSet = this.tickerSets().find(
      (tickerSet) => tickerSet.name === name
    );
    if (tickerSet) {
      this.sessionConfigurationService.setTickerSet(tickerSet);
    }
  }
}
