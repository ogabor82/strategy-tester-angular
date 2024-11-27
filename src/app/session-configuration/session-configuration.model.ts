import { BacktestSession } from '../backtest-sessions/backtest-session.model';
import { Strategy } from '../strategies/strategy.model';
import { TickerSet } from '../ticker-sets/ticker-set.model';
import { TimeframeSet } from '../timeframe-sets/timeframe-set.model';

export interface SessionConfiguration {
  strategy: Strategy | undefined;
  tickerSet: TickerSet | undefined;
  timeframeSet: TimeframeSet | undefined;
  backtestSession: BacktestSession | undefined;
}
