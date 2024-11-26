import { Injectable } from '@angular/core';
import { Strategy } from '../strategies/strategy.model';
import { SessionConfiguration } from './session-configuration.model';

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
  };

  getSessionConfiguration(): SessionConfiguration {
    return this.sessionConfiguration;
  }

  setStrategy(strategy: Strategy): void {
    this.sessionConfiguration.strategy = strategy;
  }
}
