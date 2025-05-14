import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { MaintenanceService } from '../../services/maintenance.service';


@Component({
  selector: 'app-maintenance-history',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule
  ],
  templateUrl: './maintenance-history.component.html',
  styleUrl: './maintenance-history.component.css'
})

export class MaintenanceHistoryComponent implements OnInit {
  maintenanceRecords: any[] = [];

  constructor(private maintenanceService: MaintenanceService) {}

  ngOnInit(): void {
    const email = localStorage.getItem('userEmail');
    if (!email) return;

    this.maintenanceService.getMaintenanceByUser(email).subscribe({
      next: data => this.maintenanceRecords = data,
      error: err => console.error('Failed to load maintenance records', err)
    });
  }

  addMaintenanceRecord() {
    alert('Add maintenance record functionality coming soon');
  }

  viewRecord(id: number) {
    alert(`Viewing maintenance record ${id}`);
  }

  editRecord(id: number) {
    alert(`Editing maintenance record ${id}`);
  }

  deleteRecord(id: number) {
    if (confirm(`Delete record ${id}?`)) {
      alert(`Record ${id} deleted`);
    }
  }
}

