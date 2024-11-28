import { Component, DestroyRef, inject, signal } from '@angular/core';
import { BacktestSession } from './backtest-session.model';
import { HttpClient } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SessionConfigurationService } from '../session-configuration/session-configuratio.service';
import { MatButtonModule } from '@angular/material/button';
import { BacktestSessionNewComponent } from '../backtest-session-new/backtest-session-new.component';
import { BacktestSessionService } from '../backtest-session/backtest-session.service';

@Component({
  selector: 'app-backtest-sessions',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    BacktestSessionNewComponent,
  ],
  templateUrl: './backtest-sessions.component.html',
  styleUrl: './backtest-sessions.component.scss',
})
export class BacktestSessionsComponent {
  sessions = signal<BacktestSession[]>([]);
  isFetching = signal(false);
  newDialogOpen = signal(false);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private sessionConfigurationService = inject(SessionConfigurationService);
  private backtestSessionService = inject(BacktestSessionService);

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

  get selectedBacktestSession() {
    return this.sessionConfigurationService.getBacktestSession();
  }

  selectBacktestSession(backtestSession: BacktestSession) {
    this.sessionConfigurationService.setBacktestSession(backtestSession);
  }

  newBacktestSession() {
    this.newDialogOpen.set(true);
  }

  createSession(session: { name: string; details: string }) {
    this.backtestSessionService.createSession(session).subscribe((data) => {
      this.sessions.set([...this.sessions(), data]);
      this.newDialogOpen.set(false);
    });
  }
}
