// maintenance-tracker.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component'; // 👈 Import Navbar
import { SidebarComponent } from '../../components/sidebar/sidebar.component'; // 👈 Import Sidebar
import { RouterModule } from '@angular/router'; // 👈 Needed for routerLink to work
import { MaintenanceService } from '../../services/maintenance.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehicleService } from '../../services/vehicle.service';
import { MaintenanceFormComponent } from '../../components/maintenance-form/maintenance-form.component';

@Component({
  selector: 'app-maintenance-tracker',
  standalone: true,
  imports: [
    NavbarComponent,
    SidebarComponent,
    RouterModule,
    CommonModule,
    FormsModule,
    MaintenanceFormComponent
  ],// Add any necessary imports here
  templateUrl: './maintenance-tracker.component.html',
  styleUrls: ['./maintenance-tracker.component.css'],
})

export class MaintenanceTrackerComponent implements OnInit {
  showModal = false;
  vehicles: any[] = [];
  maintenanceRecords: any[] = [];
  overdue: any[] = [];
  upcoming: any[] = [];
  future: any[] = [];

  newMaintenance: any = {
    vehicleId: '',
    serviceType: '',
    serviceDate: '',
    mileage: '',
    cost: 0
  };

  constructor(
    private maintenanceService: MaintenanceService,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    const email = localStorage.getItem('userEmail');
    if (!email) return;

    this.vehicleService.getVehiclesByOwner(email).subscribe({
      next: vehicles => {
        this.vehicles = vehicles;
        this.loadMaintenance(email);
      },
      error: err => console.error('Failed to load vehicles', err)
    });
  }

  loadMaintenance(email: string) {
    this.maintenanceService.getMaintenanceByUser(email).subscribe({
      next: (data) => {
        this.maintenanceRecords = data;
        this.categorizeRecords();
      },
      error: (err) => console.error('Failed to load maintenance records', err)
    });
  }

  categorizeRecords() {
    const today = new Date();

    this.overdue = [];
    this.upcoming = [];
    this.future = [];

    this.maintenanceRecords.forEach(record => {
      const dueDate = new Date(record.serviceDate);
      const daysUntilDue = (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

      if (daysUntilDue < 0) {
        this.overdue.push(record);
      } else if (daysUntilDue <= 30) {
        this.upcoming.push(record);
      } else {
        this.future.push(record);
      }
    });
  }

  getVehicleDisplay(vehicleId: string) {
    const vehicle = this.vehicles.find(v => v._id === vehicleId);
    return vehicle ? `${vehicle.make} ${vehicle.model} (${vehicle.plate})` : 'Unknown Vehicle';
  }

  addMaintenance() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  submitMaintenance() {
    this.maintenanceService.addMaintenance(this.newMaintenance).subscribe({
      next: () => {
        alert('Maintenance added');
        this.closeModal();
        const email = localStorage.getItem('userEmail');
        if (email) this.loadMaintenance(email);
      },
      error: err => {
        console.error(err);
        alert('Failed to add maintenance');
      }
    });
  }
}