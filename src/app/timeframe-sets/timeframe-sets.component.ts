import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { TimeframeSet } from './timeframe-set.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-timeframe-sets',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './timeframe-sets.component.html',
  styleUrl: './timeframe-sets.component.scss',
})
export class TimeframeSetsComponent implements OnInit {
  timeframeSets = signal<TimeframeSet[]>([]);
  isFetching = signal(false);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

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
}
