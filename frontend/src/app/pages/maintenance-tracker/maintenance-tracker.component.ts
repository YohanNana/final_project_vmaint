// maintenance-tracker.component.ts
import { Component, OnInit } from '@angular/core';
import { MaintenanceService } from '../../services/maintenance.service';
import { VehicleService }     from '../../services/vehicle.service';   // ← inject VehicleService
import { Router }             from '@angular/router';
import { NavbarComponent }    from '../../components/navbar/navbar.component';
import { SidebarComponent }   from '../../components/sidebar/sidebar.component';
import { CommonModule }       from '@angular/common';
import { MaintenanceFormComponent } from '../../components/maintenance-form/maintenance-form.component';

@Component({
  selector: 'app-maintenance-tracker',
  standalone: true,
  imports: [
    NavbarComponent,
    SidebarComponent,
    CommonModule,
    MaintenanceFormComponent
  ],
  templateUrl: './maintenance-tracker.component.html',
  styleUrls: ['./maintenance-tracker.component.css']
})
export class MaintenanceTrackerComponent implements OnInit {
  vehicles: any[] = [];
  records: any[]  = [];

  overdue: any[]  = [];
  upcoming: any[]= [];
  future: any[]   = [];

  formVisible = false;
  formData: any  = {};

  constructor(
    private ms: MaintenanceService,
    private vs: VehicleService,      // ← add this
    private router: Router
  ) {}

  ngOnInit() {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      this.router.navigate(['/login']);
      return;
    }

    // 1) Load current user's vehicles
    this.vs.getVehiclesByOwner(email).subscribe({
      next: v => this.vehicles = v,
      error: e => console.error('Failed to load vehicles', e)
    });

    // 2) Load maintenance records
    this.ms.getMaintenanceByUser(email).subscribe({
      next: recs => {
        this.records = recs;
        this.categorizeRecords(recs);
      },
      error: err => console.error('Failed to load maintenance records', err)
    });
  }

  private addDays(d: Date, n: number) {
    const r = new Date(d);
    r.setDate(r.getDate() + n);
    return r;
  }

  private categorizeRecords(recs: any[]) {
    const today = new Date();
    this.overdue  = recs.filter(r => new Date(r.serviceDate) < today);
    this.upcoming = recs.filter(r => {
      const due = new Date(r.serviceDate);
      return due >= today && due <= this.addDays(today, 30);
    });
    this.future   = recs.filter(r => new Date(r.serviceDate) > this.addDays(today, 30));
  }

  getVehicleDisplay(v: any) {
    if (!v) return '';
    return `${v.make} ${v.model} (${v.plate})`;
  }

  addMaintenance() {
    this.formData = {
      vehicleId: null,
      serviceType: '',
      serviceDate: '',
      mileage: null,
      cost: null,
      notes: ''
    };
    this.formVisible = true;
  }

  onSave() {
    const email = localStorage.getItem('userEmail');
    if (!email) return alert('Not logged in');

    const payload = {
      ...this.formData,
      ownerEmail: email   // ← ensure ownerEmail is sent
    };

    this.ms.addMaintenance(payload).subscribe({
      next: rec => {
        this.records.unshift(rec);
        this.categorizeRecords(this.records);
        this.formVisible = false;
      },
      error: err => {
        console.error('Failed to add maintenance', err);
        alert('Failed to add maintenance');
      }
    });
  }

  onCloseForm() {
    this.formVisible = false;
  }
}
// Note: The above code assumes that the backend API is set up to handle the new fields and that the VehicleService is correctly implemented.