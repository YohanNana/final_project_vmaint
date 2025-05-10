// maintenance-tracker.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component'; // 👈 Import Navbar
import { SidebarComponent } from '../../components/sidebar/sidebar.component'; // 👈 Import Sidebar
import { RouterModule } from '@angular/router'; // 👈 Needed for routerLink to work

@Component({
  selector: 'app-maintenance-tracker',
  standalone: true,
  imports: [
    NavbarComponent, 
    SidebarComponent, 
    RouterModule // 👈 Import Maintenance Card
  ], // Add any necessary imports here
  templateUrl: './maintenance-tracker.component.html',
  styleUrls: ['./maintenance-tracker.component.css'],
})

export class MaintenanceTrackerComponent {

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('authToken');
    // this.router.navigate(['/login']);
  }

  addMaintenance() {
    alert('Add maintenance functionality would be implemented here');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  ngOnInit() {
    if (!this.isAuthenticated()) {
      // this.router.navigate(['/login']);
    }
  }

}
