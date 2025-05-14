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
    nextServiceDue: '',
    ownerEmail: ''
  };

  

  submitForm() {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      alert("You must be logged in.");
      return;
    }
  
    const vehicleData = {
      ...this.vehicle,
      ownerEmail: email
    };
  
    console.log('Submitting vehicle data:', vehicleData);

    fetch('http://localhost:5000/api/vehicles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(vehicleData)
    })
    .then(response => {
      if (!response.ok) throw new Error('Failed to register vehicle');
      return response.json();
    })
    .then(data => {
      alert('Vehicle registered successfully!');
      console.log(data);
    })
    .catch(error => {
      if (error.error?.error?.includes('duplicate key')) {
        alert('Plate number or VIN already exists. Please use unique values.');
      } else {
        alert('Error registering vehicle.');
      }
    });
    
  }
  
  

  logout() {
    localStorage.removeItem('authToken');
    window.location.href = '/';
  }

}
