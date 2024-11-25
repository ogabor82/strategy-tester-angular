export interface OptimizationSession {
  id: number;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  strategy_id: number;
  created_at: string;
  completed_at?: string;
}
