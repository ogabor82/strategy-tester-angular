import { Component, inject } from '@angular/core';
import { SessionConfigurationService } from './session-configuratio.service';
import { SessionConfiguration } from './session-configuration.model';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BacktestSessionService } from '../backtest-session/backtest-session.service';
import { JsonPipe } from '@angular/common';
import { BacktestSet } from '../strategies/strategy.model';
@Component({
  selector: 'app-session-configuration',
  standalone: true,
  imports: [MatChipsModule, MatIconModule, MatButtonModule, JsonPipe],
  templateUrl: './session-configuration.component.html',
  styleUrl: './session-configuration.component.scss',
})
export class SessionConfigurationComponent {
  private backtestSessionService = inject(BacktestSessionService);
  constructor(
    private sessionConfigurationService: SessionConfigurationService
  ) {}

  get sessionConfiguration(): SessionConfiguration {
    return this.sessionConfigurationService.getSessionConfiguration();
  }

  selectBacktestSet(backtestSet: BacktestSet) {
    this.sessionConfigurationService.setStrategyBacktestSet(backtestSet);
  }

  runBacktest() {
    this.backtestSessionService
      .runBacktest(this.sessionConfiguration)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => console.error(error),
      });
  }
}
