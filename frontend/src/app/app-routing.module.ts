import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { VehicleRegistrationComponent } from './pages/vehicle-registration/vehicle-registration.component';
import { VehicleDetailsComponent } from './pages/vehicle-details/vehicle-details.component';
import { MaintenanceTrackerComponent } from './pages/maintenance-tracker/maintenance-tracker.component';
import { MaintenanceHistoryComponent } from './pages/maintenance-history/maintenance-history.component';
import { PredictionPageComponent } from './pages/prediction-page/prediction-page.component';
import { ReportsComponent } from './pages/reports/reports.component'; // Import the ReportsComponent
import { AnalyticsDashboardComponent } from './pages/analytics-dashboard/analytics-dashboard.component'; // Import the AnalyticsDashboardComponent
import { SettingsComponent } from './pages/settings/settings.component'; // Import the SettingsComponent
import { NotificationsComponent } from './pages/notifications/notifications.component'; // Import the NotificationsComponent
import { LoginComponent } from './pages/login/login.component'; // Import the LoginComponent
import { RegisterComponent } from './pages/register/register.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'vehicle-registration', component: VehicleRegistrationComponent },
  { path: 'vehicle-details', component: VehicleDetailsComponent },
  { path: 'maintenance-tracker', component: MaintenanceTrackerComponent },
  { path: 'maintenance-history', component: MaintenanceHistoryComponent },
  { path: 'prediction', component: PredictionPageComponent },
  { path: 'reports', component: ReportsComponent }, // Add the route for ReportsComponent
  { path: 'analytics', component: AnalyticsDashboardComponent }, // Add the route for AnalyticsDashboardComponent
  { path: 'settings', component: SettingsComponent }, // Add the route for SettingsComponent
  { path: 'notifications', component: NotificationsComponent }, // Add the route for NotificationsComponent
  { path: 'login', component: LoginComponent }, // Add the route for LoginComponent
  { path: 'register', component: RegisterComponent }, // Add the route for RegisterComponent
  { path: 'vehicle', component: VehicleComponent }, // Add the route for VehicleComponent
  // add more routes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
