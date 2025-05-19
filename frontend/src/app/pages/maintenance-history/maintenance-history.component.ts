import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { MaintenanceService } from '../../services/maintenance.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';


@Component({
  selector: 'app-maintenance-history',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    SidebarComponent
  ],
  templateUrl: './maintenance-history.component.html',
  styleUrl: './maintenance-history.component.css'
})

export class MaintenanceHistoryComponent implements OnInit {
  maintenanceRecords: any[] = [];
  totalCost = 0;
  avgInterval = 0;
  mostCommonService = '';

  constructor(private maintenanceService: MaintenanceService) {}

  ngOnInit(): void {
    const email = localStorage.getItem('userEmail');
    if (!email) return;

    this.maintenanceService.getMaintenanceByUser(email).subscribe({
      next: data => {
        
        const today = new Date();

        this.maintenanceRecords = data
          .filter((record: any) => new Date(record.serviceDate) <= today)
          .sort((a: any, b: any) => new Date(b.serviceDate).getTime() - new Date(a.serviceDate).getTime());
        this.calculateStats(); // 👇 also calculate stats here
      },
      error: err => console.error('Failed to load maintenance records', err)
    });
  }


  calculateStats() {
    if (!this.maintenanceRecords.length) return;

    this.totalCost = this.maintenanceRecords.reduce((sum, r) => sum + (r.cost || 0), 0);

    // Average interval (in months) between service dates
    const dates = this.maintenanceRecords
      .map(r => new Date(r.serviceDate).getTime())
      .sort((a, b) => a - b);

    let intervals: number[] = [];
    for (let i = 1; i < dates.length; i++) {
      const months = (dates[i] - dates[i - 1]) / (1000 * 60 * 60 * 24 * 30);
      intervals.push(months);
    }
    this.avgInterval = intervals.length
      ? parseFloat((intervals.reduce((a, b) => a + b) / intervals.length).toFixed(1))
      : 0;

    // Most common service
    const freq: Record<string, number> = {};
    this.maintenanceRecords.forEach(r => {
      freq[r.serviceType] = (freq[r.serviceType] || 0) + 1;
    });
    this.mostCommonService = Object.entries(freq).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
  }


    editRecord(id: string) {
      const record = this.maintenanceRecords.find(r => r._id === id);
      if (!record) return;

      const updatedCost = prompt('Enter new cost:', record.cost);
      if (updatedCost !== null) {
        const updated = { ...record, cost: parseFloat(updatedCost) };
        this.maintenanceService.updateMaintenance(id, updated).subscribe(res => {
          Object.assign(record, res);
          this.calculateStats();
        });
      }
    }


  deleteRecord(id: string) {
    if (confirm(`Delete record ${id}?`)) {
      this.maintenanceService.deleteMaintenance(id).subscribe(() => {
        this.maintenanceRecords = this.maintenanceRecords.filter(r => r._id !== id);
        this.calculateStats();
      });
    }
  }

}

