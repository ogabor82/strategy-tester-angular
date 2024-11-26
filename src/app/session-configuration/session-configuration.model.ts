import { Strategy } from '../strategies/strategy.model';
import { TickerSet } from '../ticker-sets/ticker-set.model';

export interface SessionConfiguration {
  strategy: Strategy | undefined;
  tickerSet: TickerSet | undefined;
}
