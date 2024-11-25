import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OptimizationSession } from './optimization-session.model';

@Component({
  selector: 'app-optimization-sessions',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './optimization-sessions.component.html',
  styleUrl: './optimization-sessions.component.scss',
})
export class OptimizationSessionsComponent implements OnInit {
  sessions = signal<OptimizationSession[]>([]);
  isFetching = signal(false);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

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
}
