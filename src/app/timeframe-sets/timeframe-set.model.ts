export interface Timeframe {
  id?: number;
  name?: string;
  start: string;
  end: string;
  interval: string;
}

export interface TimeframeSet {
  id: number;
  name: string;
  description?: string;
  timeframes: Timeframe[];
}
