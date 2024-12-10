import {
  Component,
  DestroyRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { BacktestSlice } from './backtest-slice.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { JsonPipe, DatePipe, DecimalPipe } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-backtest-session',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    JsonPipe,
    DatePipe,
    DecimalPipe,
  ],
  templateUrl: './backtest-session.component.html',
  styleUrl: './backtest-session.component.scss',
})
export class BacktestSessionComponent {
  sessionId = inject(ActivatedRoute).snapshot.params['sessionId'];
  private httpClient = inject(HttpClient);
  slices = signal<BacktestSlice[]>([]);
  sortedData = signal<BacktestSlice[]>([]);
  isFetching = signal(false);
  private destroyRef = inject(DestroyRef);
  displayedColumns: string[] = [
    // 'id',
    'ticker',
    'strategy',
    'strategy_parameters',
    'start',
    'end',
    'kelly_criterion',
    'interval',
    'return',
    'return_ratio',
    'buyhold_return',
    'win_rate',
    'max_drawdown',
    'sharpe_ratio',
    'trades',
    'filename',
  ];

  sortData(sortData: Sort) {
    const data = this.slices().slice();

    this.sortedData.set(
      data.sort((a, b) => {
        const isAsc = sortData.direction === 'asc';
        switch (sortData.active) {
          case 'return':
            return this.compare(a.return, b.return, isAsc);
          case 'ticker':
            return this.compare(a.ticker, b.ticker, isAsc);
          default:
            return 0;
        }
      })
    );
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.httpClient
      .get<BacktestSlice[]>(
        `http://127.0.0.1:5000/backtest-sessions/${this.sessionId}`
      )
      .pipe(
        map((data) =>
          data.map((slice) => ({
            ...slice,
            strategy_parameters: JSON.parse(slice.strategy_parameters),
            return_ratio: slice.return / slice.buyhold_return,
          }))
        )
      )
      .subscribe({
        next: (data) => {
          this.slices.set(data);
          this.sortedData.set(data);
        },
        complete: () => this.isFetching.set(false),
        error: (error) => console.error(error),
      });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
