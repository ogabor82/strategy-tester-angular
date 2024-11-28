import { Component, DestroyRef, inject, signal } from '@angular/core';
import { BacktestSlice } from './backtest-slice.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-backtest-session',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatTableModule],
  templateUrl: './backtest-session.component.html',
  styleUrl: './backtest-session.component.scss',
})
export class BacktestSessionComponent {
  sessionId = inject(ActivatedRoute).snapshot.params['sessionId'];
  private httpClient = inject(HttpClient);
  slices = signal<BacktestSlice[]>([]);
  isFetching = signal(false);
  private destroyRef = inject(DestroyRef);
  displayedColumns: string[] = [
    // 'id',
    'ticker',
    'strategy',
    'start',
    'end',
    'kelly_criterion',
    'interval',
    'return',
    'buyhold_return',
    'win_rate',
    'max_drawdown',
    'sharpe_ratio',
    'trades',
    'filename',
  ];

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.httpClient
      .get<BacktestSlice[]>(
        `http://127.0.0.1:5000/backtest-sessions/${this.sessionId}`
      )
      .subscribe({
        next: (data) => this.slices.set(data),
        complete: () => this.isFetching.set(false),
        error: (error) => console.error(error),
      });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
