import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { OptimizationSession } from './optimization-session.model';
import { RouterModule } from '@angular/router';
import { SessionConfigurationService } from '../session-configuration/session-configuration.service';
import { MatButtonModule } from '@angular/material/button';
import { OptimizationSessionNewComponent } from '../optimization-session-new/optimization-session-new.component';
import { OptimizationSessionService } from './optimization-session.service';
import { OptimizationSessionDeleteComponent } from '../optimization-session-delete/optimization-session-delete.component';

@Component({
  selector: 'app-optimization-sessions',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    OptimizationSessionNewComponent,
    OptimizationSessionDeleteComponent,
  ],
  templateUrl: './optimization-sessions.component.html',
  styleUrl: './optimization-sessions.component.scss',
})
export class OptimizationSessionsComponent implements OnInit {
  sessions = signal<OptimizationSession[]>([]);
  isFetching = signal(false);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private sessionConfigurationService = inject(SessionConfigurationService);
  private optimizationSessionService = inject(OptimizationSessionService);
  newDialogOpen = signal(false);
  deleteDialogOpen = signal(false);
  selectedOptimizationSessionToDelete = signal<OptimizationSession | undefined>(
    undefined
  );

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.httpClient
      .get<OptimizationSession[]>('http://127.0.0.1:5000/optimization-sessions')
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

  get selectedOptimizationSession() {
    return this.sessionConfigurationService.getOptimizationSession();
  }

  selectOptimizationSession(optimizationSession: OptimizationSession) {
    this.sessionConfigurationService.setOptimizationSession(
      optimizationSession
    );
  }

  newOptimizationSession() {
    this.newDialogOpen.set(true);
  }

  createSession(session: { name: string; details: string }) {
    this.optimizationSessionService.createSession(session).subscribe((data) => {
      this.sessions.set([...this.sessions(), data]);
      this.newDialogOpen.set(false);
    });
  }

  openDeleteDialog(session: OptimizationSession) {
    this.selectedOptimizationSessionToDelete.set(session);
    this.deleteDialogOpen.set(true);
  }

  deleteSession(session: OptimizationSession) {
    this.optimizationSessionService.deleteSession(session.id).subscribe(() => {
      this.sessions.set(this.sessions().filter((s) => s.id !== session.id));
      this.deleteDialogOpen.set(false);
    });
  }
}
