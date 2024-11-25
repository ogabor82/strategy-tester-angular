import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Strategy } from './strategy.model';

@Component({
  selector: 'app-strategies',
  standalone: true,
  imports: [],
  templateUrl: './strategies.component.html',
  styleUrl: './strategies.component.scss',
})
export class StrategiesComponent implements OnInit {
  strategies = signal<Strategy[]>([]);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    const subscription = this.httpClient
      .get<Strategy[]>('http://127.0.0.1:5000/strategies')
      .subscribe({
        next: (data) => {
          this.strategies.set(data);
        },
        error: (error) => {
          console.error(error);
        },
      });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
