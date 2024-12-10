import { Injectable } from '@angular/core';
import {
  BacktestSet,
  OptimizationSet,
  Strategy,
} from '../strategies/strategy.model';
import { SessionConfiguration } from './session-configuration.model';
import { TickerSet } from '../ticker-sets/ticker-set.model';
import { Timeframe, TimeframeSet } from '../timeframe-sets/timeframe-set.model';
import { BacktestSession } from '../backtest-sessions/backtest-session.model';
import { OptimizationSession } from '../optimization-sessions/optimization-session.model';

@Injectable({
  providedIn: 'root',
})
export class SessionConfigurationService {
  private sessionConfiguration: SessionConfiguration = {
    strategy: {
      id: 1,
      name: 'auto',
      description: 'auto',
      is_favorite: false,
      backtest_sets: [],
      optimization_sets: [],
    },
    strategyBacktestSet: {
      name: 'auto',
    },
    strategyOptimizationSet: {
      name: 'auto',
      config: {},
      variables: {},
    },
    tickerSet: {
      id: 1,
      name: 'auto',
      description: 'auto',
      tickers: [],
    },
    timeframeSet: {
      id: 1,
      name: 'auto',
      description: 'auto',
      timeframes: [],
    },
    backtestSession: undefined,
    optimizationSession: undefined,
  };

  constructor() {
    const sessionConfiguration = localStorage.getItem('sessionConfiguration');
    if (sessionConfiguration) {
      this.sessionConfiguration = JSON.parse(sessionConfiguration);
    }
  }

  private saveSessionConfiguration() {
    localStorage.setItem(
      'sessionConfiguration',
      JSON.stringify(this.sessionConfiguration)
    );
  }

  getSessionConfiguration(): SessionConfiguration {
    return this.sessionConfiguration;
  }

  getStrategy(): Strategy | undefined {
    return this.sessionConfiguration.strategy;
  }

  setStrategy(strategy: Strategy): void {
    this.sessionConfiguration.strategy = strategy;
    this.saveSessionConfiguration();
  }

  setTickerSet(tickerSet: TickerSet) {
    this.sessionConfiguration.tickerSet = { ...tickerSet };
    this.saveSessionConfiguration();
  }

  getTickerSet(): TickerSet | undefined {
    return this.sessionConfiguration.tickerSet;
  }

  setTimeframeSet(timeframeSet: TimeframeSet) {
    this.sessionConfiguration.timeframeSet = timeframeSet;
    this.saveSessionConfiguration();
  }

  setTimeframe(timeframe: Timeframe) {
    const newTimeframeSet: TimeframeSet = {
      id: this.sessionConfiguration.timeframeSet?.id ?? 0,
      name: this.sessionConfiguration.timeframeSet?.name ?? '',
      description: this.sessionConfiguration.timeframeSet?.description ?? '',
      timeframes: [timeframe],
    };

    this.sessionConfiguration.timeframeSet = newTimeframeSet;
    this.saveSessionConfiguration();
  }

  get TimeframeSet(): TimeframeSet | undefined {
    return this.sessionConfiguration.timeframeSet;
  }

  setBacktestSession(backtestSession: BacktestSession) {
    this.sessionConfiguration.backtestSession = backtestSession;
    this.saveSessionConfiguration();
  }

  getBacktestSession(): BacktestSession | undefined {
    return this.sessionConfiguration.backtestSession;
  }

  setStrategyBacktestSet(backtestSet: BacktestSet) {
    this.sessionConfiguration.strategyBacktestSet = backtestSet;
    this.saveSessionConfiguration();
  }

  setStrategyOptimizationSet(optimizationSet: OptimizationSet) {
    this.sessionConfiguration.strategyOptimizationSet = optimizationSet;
    this.saveSessionConfiguration();
  }

  getOptimizationSession(): OptimizationSession | undefined {
    return this.sessionConfiguration.optimizationSession;
  }

  setOptimizationSession(optimizationSession: OptimizationSession) {
    this.sessionConfiguration.optimizationSession = optimizationSession;
    this.saveSessionConfiguration();
  }

  removeTicker(ticker: string) {
    if (this.sessionConfiguration.tickerSet) {
      this.sessionConfiguration.tickerSet.tickers =
        this.sessionConfiguration.tickerSet.tickers.filter((t) => t !== ticker);
    }
    this.saveSessionConfiguration();
  }
}
