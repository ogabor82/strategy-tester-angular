import { Component, DestroyRef, inject, signal } from '@angular/core';
import { BacktestSession } from './backtest-session.model';
import { HttpClient } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-backtest-sessions',
  standalone: true,
  imports: [MatProgressSpinnerModule, RouterModule],
  templateUrl: './backtest-sessions.component.html',
  styleUrl: './backtest-sessions.component.scss',
})
export class BacktestSessionsComponent {
  sessions = signal<BacktestSession[]>([]);
  isFetching = signal(false);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.httpClient
      .get<BacktestSession[]>('http://127.0.0.1:5000/backtest-sessions')
      .subscribe({
        next: (data) => {
          this.sessions.set(data);
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
}
