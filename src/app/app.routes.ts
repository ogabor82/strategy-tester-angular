import { Routes } from '@angular/router';
import { StrategiesComponent } from './strategies/strategies.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'strategies', component: StrategiesComponent },
];
