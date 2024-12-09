import { Component, DestroyRef, inject, signal } from '@angular/core';
import { BacktestSession } from './backtest-session.model';
import { HttpClient } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SessionConfigurationService } from '../session-configuration/session-configuration.service';
import { MatButtonModule } from '@angular/material/button';
import { BacktestSessionNewComponent } from '../backtest-session-new/backtest-session-new.component';
import { BacktestSessionService } from '../backtest-session/backtest-session.service';
import { BacktestSessionDeleteComponent } from '../backtest-session-delete/backtest-session-delete.component';

@Component({
  selector: 'app-backtest-sessions',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    BacktestSessionNewComponent,
    BacktestSessionDeleteComponent,
  ],
  templateUrl: './backtest-sessions.component.html',
  styleUrl: './backtest-sessions.component.scss',
})
export class BacktestSessionsComponent {
  sessions = signal<BacktestSession[]>([]);
  isFetching = signal(false);
  newDialogOpen = signal(false);
  deleteDialogOpen = signal(false);
  selectedBacktestSessionToDelete = signal<BacktestSession | undefined>(
    undefined
  );
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private sessionConfigurationService = inject(SessionConfigurationService);
  private backtestSessionService = inject(BacktestSessionService);
  projectId = inject(ActivatedRoute).snapshot.params['projectId'];

  ngOnInit() {
    this.isFetching.set(true);
    let url = 'http://127.0.0.1:5000/backtest-sessions';
    if (this.projectId) {
      url = `http://127.0.0.1:5000/projects/${this.projectId}/backtest-sessions`;
    }
    const subscription = this.httpClient.get<BacktestSession[]>(url).subscribe({
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

  createSession(session: {
    name: string;
    details: string;
    project_id?: number;
  }) {
    this.backtestSessionService.createSession(session).subscribe((data) => {
      this.sessions.set([...this.sessions(), data]);
      this.newDialogOpen.set(false);
    });
  }

  openDeleteDialog(session: BacktestSession) {
    this.selectedBacktestSessionToDelete.set(session);
    this.deleteDialogOpen.set(true);
  }

  deleteSession(session: BacktestSession) {
    this.backtestSessionService.deleteSession(session.id).subscribe(() => {
      this.sessions.set(this.sessions().filter((s) => s.id !== session.id));
      this.deleteDialogOpen.set(false);
    });
  }
}
