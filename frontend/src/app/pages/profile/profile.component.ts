import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { VehicleCardComponent } from '../../components/vehicle-card/vehicle-card.component';
import { VehicleService } from '../../services/vehicle.service'; // 👈 Import VehicleService
import { SidebarComponent } from '../../components/sidebar/sidebar.component'; // 👈 Import AppSidebarComponent

@Component({
  selector: 'app-profile',
  standalone: true,
  imports:[
            NavbarComponent, 
            CommonModule, 
            RouterModule, 
            FormsModule,
            VehicleCardComponent, // 👈 Import VehicleCardComponent
            SidebarComponent // 👈 Import AppSidebarComponent
          ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  vehicles: any[] = [];

  isEditMode = false;

  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  accountType = 'Vehicle Owner';
  memberSince = '';

  // vehicles: any[] = [];

  constructor(private router: Router, private authService: AuthService, private vehicleService: VehicleService ) {}

  originalEmail = ''; // Add this line

  ngOnInit(): void {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      this.router.navigate(['/login']);
      return;
    }
  
    // Load user info from local storage
    this.firstName = localStorage.getItem('userFirstName') || '';
    this.lastName = localStorage.getItem('userLastName') || '';
    this.email = email;
    this.phone = localStorage.getItem('userPhone') || '';
    this.accountType = localStorage.getItem('userAccountType') || '';
    this.memberSince = localStorage.getItem('userCreatedAt') || '';
  
    // Load user's vehicles
    this.vehicleService.getVehiclesByOwner(email).subscribe({
      next: data => this.vehicles = data,
      error: err => console.error('Error loading vehicles:', err)
    });
  }
  

  
  
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  cancelEdit() {
    this.isEditMode = false;
  }

  saveProfile() {
    const email = localStorage.getItem('userEmail');
    const updatedData = {
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      accountType: this.accountType
    };

    localStorage.setItem('userFirstName', this.firstName);
  localStorage.setItem('userLastName', this.lastName);
  localStorage.setItem('userPhone', this.phone);
  localStorage.setItem('userAccountType', this.accountType);

  
    if (email) {
      this.authService.updateUserByEmail(email, updatedData).subscribe({
        next: () => {
          alert('Profile updated');
          this.isEditMode = false;
          this.ngOnInit(); // reload updated data
        },
        error: err => {
          console.error(err);
          alert('Update failed.');
        }
      });
    }
  }
  
  
  
  
}
