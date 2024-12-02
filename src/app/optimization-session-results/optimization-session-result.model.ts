export interface OptimizationSessionResult {
  id: number;
  sessionId: number;
  start: Date;
  end: Date;
  interval: string;
  optimization_results: string;
  optimization_session_id: number;
  strategy_id: number;
  strategy_name: string;
  ticker: string;
  timeframe_id: number | null;
}
