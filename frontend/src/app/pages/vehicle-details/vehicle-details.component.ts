import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { Observable } from 'rxjs';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // 👈 Import RouterModule for *ngIf
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-vehicle-details',
  standalone: true,
  imports: [
    RouterLink,
    NavbarComponent,// 👈 Import NavbarComponent
    CommonModule,
    RouterModule, // Required for *ngIf in the HTML template
    SidebarComponent // 👈 Import SidebarComponent
  ],
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {

  vehicle: any = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private router: Router // 👈 Needed for logout navigation
  ) {}

  ngOnInit(): void {
    const vehicleId = this.route.snapshot.paramMap.get('id');
    console.log('Vehicle ID from route:', vehicleId);
  
    if (vehicleId) {
      this.vehicleService.getVehicleById(vehicleId).subscribe({
        next: data => {
          console.log('Vehicle fetched:', data);
          this.vehicle = data;
          this.loading = false;
        },
        error: err => {
          console.error('Vehicle fetch error:', err);
          this.loading = false;
        }
      });
    }
  }
  
  

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']); // 👈 Actually navigates to login now
  }

  editVehicle(): void {
    alert('Edit vehicle functionality would be implemented here');
  }

  toggleMobileMenu(): void {
    alert('Mobile menu toggle functionality would go here');
  }

  getVehicles(): Observable<any> {
    return this.vehicleService.getVehicles();
  }

  getVehicleById(vehicleId: string): Observable<any> {
    return this.vehicleService.getVehicleById(vehicleId);
  }
}
