import { Injectable } from '@angular/core';
import { Strategy } from '../strategies/strategy.model';
import { SessionConfiguration } from './session-configuration.model';
import { TickerSet } from '../ticker-sets/ticker-set.model';
import { TimeframeSet } from '../timeframe-sets/timeframe-set.model';

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
    this.sessionConfiguration.tickerSet = tickerSet;
    this.saveSessionConfiguration();
  }

  getTickerSet(): TickerSet | undefined {
    return this.sessionConfiguration.tickerSet;
  }

  setTimeframeSet(timeframeSet: TimeframeSet) {
    this.sessionConfiguration.timeframeSet = timeframeSet;
    this.saveSessionConfiguration();
  }

  getTimeframeSet(): TimeframeSet | undefined {
    return this.sessionConfiguration.timeframeSet;
  }
}
