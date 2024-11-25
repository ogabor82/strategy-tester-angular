import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OptimizationSessionResult } from '../optimization-session-results/optimization-session-result.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-optimization-session-heatmaps',
  standalone: true,
  imports: [],
  templateUrl: './optimization-session-heatmaps.component.html',
  styleUrl: './optimization-session-heatmaps.component.scss',
})
export class OptimizationSessionHeatmapsComponent {
  sessionId = inject(ActivatedRoute).snapshot.params['sessionId'];
  private httpClient = inject(HttpClient);
  results = signal<OptimizationSessionResult[]>([]);

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.httpClient
      .get<OptimizationSessionResult[]>(
        `http://127.0.0.1:5000/optimization-sessions/${this.sessionId}`
      )
      .subscribe((data) => this.results.set(data));
  }

  sanitizeUrl(
    ticker: string,
    strategyId: string,
    start: string,
    end: string,
    interval: string
  ): SafeResourceUrl {
    const url = `http://127.0.0.1:5000/reports/optimization/optimization_results_${ticker}_${strategyId}_${start}_${end}_${interval}.html`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
