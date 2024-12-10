import { Component, inject, signal } from '@angular/core';
import { SessionConfigurationService } from './session-configuration.service';
import { SessionConfiguration } from './session-configuration.model';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BacktestSessionService } from '../backtest-session/backtest-session.service';
import { JsonPipe } from '@angular/common';
import { BacktestSet, OptimizationSet } from '../strategies/strategy.model';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { OptimizationSessionService } from '../optimization-sessions/optimization-session.service';
import { TimeframeEditorComponent } from '../timeframe-editor/timeframe-editor.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-session-configuration',
  standalone: true,
  imports: [
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    TimeframeEditorComponent,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './session-configuration.component.html',
  styleUrl: './session-configuration.component.scss',
})
export class SessionConfigurationComponent {
  protected readonly Object = Object;
  private backtestSessionService = inject(BacktestSessionService);
  private optimizationSessionService = inject(OptimizationSessionService);
  isRunningBacktest = signal(false);
  isRunningOptimization = signal(false);
  isFullView = signal(false);
  showTimeFrameEditor = signal(false);

  constructor(
    private sessionConfigurationService: SessionConfigurationService
  ) {}

  get sessionConfiguration(): SessionConfiguration {
    return this.sessionConfigurationService.getSessionConfiguration();
  }

  selectBacktestSet(backtestSet: BacktestSet) {
    this.sessionConfigurationService.setStrategyBacktestSet(backtestSet);
  }

  selectOptimizationSet(optimizationSet: OptimizationSet) {
    this.sessionConfigurationService.setStrategyOptimizationSet(
      optimizationSet
    );
  }

  toggleFullView() {
    this.isFullView.update((value) => !value);
  }

  runBacktest() {
    this.isRunningBacktest.set(true);
    this.backtestSessionService
      .runBacktest(this.sessionConfigurationService.getSessionConfiguration())
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        complete: () => {
          this.isRunningBacktest.set(false);
        },
        error: (error) => {
          console.error(error);
          this.isRunningBacktest.set(false);
        },
      });
  }

  runOptimization() {
    this.isRunningOptimization.set(true);
    this.optimizationSessionService
      .runOptimization(this.sessionConfiguration)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        complete: () => {
          this.isRunningOptimization.set(false);
        },
        error: (error) => {
          console.error(error);
          this.isRunningOptimization.set(false);
        },
      });
  }

  removeTicker(ticker: string) {
    this.sessionConfigurationService.removeTicker(ticker);
  }
}
