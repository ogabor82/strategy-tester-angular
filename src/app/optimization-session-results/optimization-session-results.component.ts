import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OptimizationSessionResult } from './optimization-session-result.model';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-optimization-session-results',
  standalone: true,
  imports: [MatTableModule, DatePipe, MatIconModule],
  templateUrl: './optimization-session-results.component.html',
  styleUrl: './optimization-session-results.component.scss',
})
export class OptimizationSessionResultsComponent {
  sessionId = inject(ActivatedRoute).snapshot.params['sessionId'];
  private httpClient = inject(HttpClient);
  results = signal<OptimizationSessionResult[]>([]);
  displayedColumns: string[] = [
    'id',
    'sessionId',
    'start',
    'end',
    'interval',
    'optimization_results',
    'optimization_session_id',
    'strategy_id',
    'ticker',
    'timeframe_id',
  ];

  ngOnInit() {
    this.httpClient
      .get<OptimizationSessionResult[]>(
        `http://127.0.0.1:5000/optimization-sessions/${this.sessionId}`
      )
      .subscribe((data) => this.results.set(data));
  }
}
