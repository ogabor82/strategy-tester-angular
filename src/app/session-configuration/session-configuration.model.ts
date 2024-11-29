import { BacktestSession } from '../backtest-sessions/backtest-session.model';
import { OptimizationSession } from '../optimization-sessions/optimization-session.model';
import {
  BacktestSet,
  OptimizationSet,
  Strategy,
} from '../strategies/strategy.model';
import { TickerSet } from '../ticker-sets/ticker-set.model';
import { TimeframeSet } from '../timeframe-sets/timeframe-set.model';

export interface SessionConfiguration {
  strategy: Strategy | undefined;
  strategyBacktestSet: BacktestSet | undefined;
  strategyOptimizationSet: OptimizationSet | undefined;
  tickerSet: TickerSet | undefined;
  timeframeSet: TimeframeSet | undefined;
  backtestSession: BacktestSession | undefined;
  optimizationSession: OptimizationSession | undefined;
}
