import { Routes } from '@angular/router';
import { StrategiesComponent } from './strategies/strategies.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TimeframeSetsComponent } from './timeframe-sets/timeframe-sets.component';
import { OptimizationSessionsComponent } from './optimization-sessions/optimization-sessions.component';
import { OptimizationSessionResultsComponent } from './optimization-session-results/optimization-session-results.component';
import { OptimizationSessionHeatmapsComponent } from './optimization-session-heatmaps/optimization-session-heatmaps.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'strategies', component: StrategiesComponent },
  { path: 'timeframe-sets', component: TimeframeSetsComponent },
  { path: 'optimization-sessions', component: OptimizationSessionsComponent },
  {
    path: 'session-results/:sessionId',
    component: OptimizationSessionResultsComponent,
  },
  {
    path: 'session-heatmaps/:sessionId',
    component: OptimizationSessionHeatmapsComponent,
  },
];
