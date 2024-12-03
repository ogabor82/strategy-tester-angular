import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OptimizationSessionResult } from './optimization-session-result.model';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { SessionConfigurationService } from '../session-configuration/session-configuration.service';
import { BacktestSet } from '../strategies/strategy.model';
import { map } from 'rxjs';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-optimization-session-results',
  standalone: true,
  imports: [MatTableModule, DatePipe, MatIconModule, JsonPipe],
  templateUrl: './optimization-session-results.component.html',
  styleUrl: './optimization-session-results.component.scss',
})
export class OptimizationSessionResultsComponent {
  sessionId = inject(ActivatedRoute).snapshot.params['sessionId'];
  private httpClient = inject(HttpClient);
  results = signal<OptimizationSessionResult[]>([]);
  private sessionConfigurationService = inject(SessionConfigurationService);

  displayedColumns: string[] = [
    'ticker',
    'strategy_name',
    'best_params',
    'metrics',
    'start',
    'end',
    'interval',
  ];

  ngOnInit() {
    this.httpClient
      .get<OptimizationSessionResult[]>(
        `http://127.0.0.1:5000/optimization-sessions/${this.sessionId}`
      )
      .pipe(
        map((data) =>
          data.map((result) => {
            const best_params = JSON.parse(
              result.optimization_results
            ).best_params;
            const metrics = JSON.parse(result.optimization_results).metrics;
            return {
              ...result,
              best_params,
              metrics,
            };
          })
        )
      )
      .subscribe((data) => this.results.set(data));
  }

  selectOptimizationResult(result: string) {
    this.sessionConfigurationService.setStrategyBacktestSet(
      result as unknown as BacktestSet
    );
  }
}
