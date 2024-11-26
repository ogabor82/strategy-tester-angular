import { Injectable } from '@angular/core';
import { Strategy } from '../strategies/strategy.model';
import { SessionConfiguration } from './session-configuration.model';
import { TickerSet } from '../ticker-sets/ticker-set.model';

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
  };

  getSessionConfiguration(): SessionConfiguration {
    return this.sessionConfiguration;
  }

  getStrategy(): Strategy | undefined {
    return this.sessionConfiguration.strategy;
  }

  setStrategy(strategy: Strategy): void {
    this.sessionConfiguration.strategy = strategy;
  }

  setTickerSet(tickerSet: TickerSet) {
    this.sessionConfiguration.tickerSet = tickerSet;
  }

  getTickerSet(): TickerSet | undefined {
    return this.sessionConfiguration.tickerSet;
  }
}
