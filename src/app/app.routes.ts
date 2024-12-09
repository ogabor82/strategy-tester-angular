import { Routes } from '@angular/router';
import { StrategiesComponent } from './strategies/strategies.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TimeframeSetsComponent } from './timeframe-sets/timeframe-sets.component';
import { OptimizationSessionsComponent } from './optimization-sessions/optimization-sessions.component';
import { OptimizationSessionResultsComponent } from './optimization-session-results/optimization-session-results.component';
import { OptimizationSessionHeatmapsComponent } from './optimization-session-heatmaps/optimization-session-heatmaps.component';
import { TickerSetsComponent } from './ticker-sets/ticker-sets.component';
import { BacktestSessionsComponent } from './backtest-sessions/backtest-sessions.component';
import { BacktestSessionComponent } from './backtest-session/backtest-session.component';
import { ProjectsComponent } from './projects/projects.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'strategies', component: StrategiesComponent },
  { path: 'timeframe-sets', component: TimeframeSetsComponent },
  { path: 'optimization-sessions', component: OptimizationSessionsComponent },
  { path: 'backtest-sessions', component: BacktestSessionsComponent },
  { path: 'backtest-session/:sessionId', component: BacktestSessionComponent },
  {
    path: 'session-results/:sessionId',
    component: OptimizationSessionResultsComponent,
  },
  {
    path: 'session-heatmaps/:sessionId',
    component: OptimizationSessionHeatmapsComponent,
  },
  {
    path: 'ticker-sets',
    component: TickerSetsComponent,
  },
  {
    path: 'projects',
    component: ProjectsComponent,
  },
];
