import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { OptimizationSession } from './optimization-session.model';
import { RouterModule } from '@angular/router';
import { SessionConfigurationService } from '../session-configuration/session-configuration.service';

@Component({
  selector: 'app-optimization-sessions',
  standalone: true,
  imports: [MatProgressSpinnerModule, RouterModule, MatIconModule],
  templateUrl: './optimization-sessions.component.html',
  styleUrl: './optimization-sessions.component.scss',
})
export class OptimizationSessionsComponent implements OnInit {
  sessions = signal<OptimizationSession[]>([]);
  isFetching = signal(false);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private sessionConfigurationService = inject(SessionConfigurationService);

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
}
