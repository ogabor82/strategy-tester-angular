export interface BacktestSet {
  [key: string]: string;
}

export interface OptimizationSet {
  name: string;
  config: { [key: string]: string };
  variables: { [key: string]: { from: string; to: string; step: string } };
}

export interface StrategyResponse {
  id: number;
  name: string;
  description: string;
  is_favorite: boolean;
  backtest_sets: string;
  optimization_sets: string;
}
export interface Strategy {
  id: number;
  name: string;
  description: string;
  is_favorite: boolean;
  backtest_sets: BacktestSet[];
  optimization_sets: OptimizationSet[];
}
