import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionConfiguration } from '../session-configuration/session-configuration.model';
import { OptimizationSession } from './optimization-session.model';

@Injectable({
  providedIn: 'root',
})
export class OptimizationSessionService {
  constructor(private http: HttpClient) {}

  runOptimization(sessionConfiguration: SessionConfiguration) {
    const optimizationRequest = {
      strategy: {
        ...sessionConfiguration.strategy,
        optimization_sets: undefined,
      },
      tickers: sessionConfiguration.tickerSet?.tickers,
      timeframe_set: sessionConfiguration.timeframeSet,
      optimization_session: sessionConfiguration.optimizationSession,
      optimization_set: sessionConfiguration.strategyOptimizationSet,
      backtest_plot: true,
    };
    return this.http.post<OptimizationSession>(
      'http://127.0.0.1:5000/run-optimization',
      optimizationRequest
    );
  }

  createSession(session: { name: string; details: string }) {
    return this.http.post<OptimizationSession>(
      'http://127.0.0.1:5000/optimization-sessions',
      session
    );
  }

  deleteSession(id: number) {
    return this.http.delete(
      `http://127.0.0.1:5000/optimization-sessions/${id}`
    );
  }
}
