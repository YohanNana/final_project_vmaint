import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-vehicle-registration',
  standalone: true,
  imports: [
    SidebarComponent,
    NavbarComponent,
    CommonModule, 
    RouterModule, 
    FormsModule,
  ],
  templateUrl: './vehicle-registration.component.html',
  styleUrls: ['./vehicle-registration.component.css']
})
export class VehicleRegistrationComponent {

  vehicle: any = {
    make: '',
    model: '',
    year: '',
    plate: '',
    vin: '',
    color: '',
    engine: '',
    transmission: '',
    mileage: '',
    purchaseDate: '',
    lastServiceDate: '',
    lastServiceType: '',
    nextServiceDue: ''
  };

  submitForm() {
    // In real app: send vehicle data to backend
    console.log('Vehicle registered:', this.vehicle);
    alert('Vehicle registered successfully!');
  }

  logout() {
    localStorage.removeItem('authToken');
    window.location.href = '/';
  }

}
