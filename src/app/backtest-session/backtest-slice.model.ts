export interface BacktestSlice {
  id: number;
  name: string;
  details: string;
  backtest_session_id: number;
  buyhold_return: number;
  configuration_id: number;
  end: string;
  interval: string;
  kelly_criterion: null;
  max_drawdown: number;
  return: number;
  sharpe_ratio: number;
  start: string;
  strategy_id: number;
  ticker: string;
  trades: number;
  win_rate: number;
  filename: string;
}
