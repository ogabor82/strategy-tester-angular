export interface BacktestSet {
  [key: string]: string;
}

export interface StrategyResponse {
  id: number;
  name: string;
  description: string;
  is_favorite: boolean;
  backtest_sets: string;
}
export interface Strategy {
  id: number;
  name: string;
  description: string;
  is_favorite: boolean;
  backtest_sets: BacktestSet[];
}
