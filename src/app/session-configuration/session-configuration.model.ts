import { BacktestSession } from '../backtest-sessions/backtest-session.model';
import { BacktestSet, Strategy } from '../strategies/strategy.model';
import { TickerSet } from '../ticker-sets/ticker-set.model';
import { TimeframeSet } from '../timeframe-sets/timeframe-set.model';

export interface SessionConfiguration {
  strategy: Strategy | undefined;
  strategyBacktestSet: BacktestSet | undefined;
  tickerSet: TickerSet | undefined;
  timeframeSet: TimeframeSet | undefined;
  backtestSession: BacktestSession | undefined;
}
