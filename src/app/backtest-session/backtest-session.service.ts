import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BacktestSession } from '../backtest-sessions/backtest-session.model';
import { SessionConfiguration } from '../session-configuration/session-configuration.model';

@Injectable({
  providedIn: 'root',
})
export class BacktestSessionService {
  constructor(private http: HttpClient) {}

  runBacktest(sessionConfiguration: SessionConfiguration) {
    const backtestRequest = {
      strategy: sessionConfiguration.strategy,
      tickers: sessionConfiguration.tickerSet?.tickers,
      timeframe_set: sessionConfiguration.timeframeSet,
      selected_session: sessionConfiguration.backtestSession,
      backtest_results: 'compact',
      backtest_plot: true,
    };
    return this.http.post<BacktestSession>(
      'http://127.0.0.1:5000/run-backtest',
      backtestRequest
    );
  }

  createSession(session: { name: string; details: string }) {
    return this.http.post<BacktestSession>(
      'http://127.0.0.1:5000/backtest-sessions',
      session
    );
  }
}
