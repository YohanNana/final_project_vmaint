import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-vehicle-details',
  standalone: true,
  imports: [
    RouterLink // 👈 Import RouterLink for navigation
    // Add any other components you need to import here
  ], // Add any necessary imports here
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!localStorage.getItem('authToken')) {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  editVehicle(): void {
    alert('Edit vehicle functionality would be implemented here');
  }

  toggleMobileMenu(): void {
    alert('Mobile menu toggle functionality would go here');
  }
}
