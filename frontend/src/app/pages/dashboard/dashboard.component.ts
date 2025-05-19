import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterModule, Router } from '@angular/router';
import { VehicleCardComponent } from '../../components/vehicle-card/vehicle-card.component';
import { VehicleService } from '../../services/vehicle.service';
import { MaintenanceService } from '../../services/maintenance.service';
import { PredictionService } from '../../services/prediction.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NavbarComponent, 
    SidebarComponent, 
    RouterModule,
    VehicleCardComponent,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  vehicles: any[] = [];
  upcomingCount: number = 0;
  predictionCount: number = 0;

  constructor(
    private vehicleService: VehicleService,
    private maintenanceService: MaintenanceService,
    private predictionService: PredictionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      this.router.navigate(['/login']);
      return;
    }

    // ✅ Load vehicles
    this.vehicleService.getVehiclesByOwner(email).subscribe({
      next: data => this.vehicles = data,
      error: err => console.error('Error loading vehicles:', err)
    });

    // ✅ Load maintenance and filter future services
    this.maintenanceService.getMaintenanceByUser(email).subscribe({
      next: records => {
        const today = new Date();
        this.upcomingCount = records.filter((r: any) => new Date(r.serviceDate) > today).length;
      },
      error: err => console.error('Failed to load maintenance records', err)
    });

    // ✅ Load predictions and count maintenanceRequired ones
    this.predictionService.listByUser(email).subscribe({
      next: preds => {
        this.predictionCount = preds.filter((p: any) => p.maintenanceRequired).length;
      },
      error: err => console.error('Failed to load predictions', err)
    });
  }

  toggleMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    menu?.classList.toggle('hidden');
  }

  logout() {
    document.body.classList.remove('logged-in');
    localStorage.removeItem('authToken');
    window.location.href = '/';
  }
}
