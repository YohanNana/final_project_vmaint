import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component'; // 👈 Import Navbar
import { SidebarComponent } from '../../components/sidebar/sidebar.component'; // 👈 Import Sidebar
import { RouterModule, Router } from '@angular/router'; // 👈 Needed for routerLink to work
import { VehicleCardComponent } from '../../components/vehicle-card/vehicle-card.component';
import { VehicleService } from '../../services/vehicle.service'; // 👈 Import VehicleService


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NavbarComponent, 
    SidebarComponent, 
    RouterModule,
    VehicleCardComponent, // 👈 Import VehicleCardComponent
    CommonModule // 👈 Import CommonModule for ngIf, ngFor, etc.  
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  vehicles: any[] = [];

  constructor(private vehicleService: VehicleService, private router: Router) {}

  ngOnInit(): void {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      this.router.navigate(['/login']);
      return;
    }

    this.vehicleService.getVehiclesByOwner(email).subscribe({
      next: data => this.vehicles = data,
      error: err => console.error('Error loading vehicles:', err)
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
