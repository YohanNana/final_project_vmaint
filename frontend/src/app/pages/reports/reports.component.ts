import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { VehicleService } from '../../services/vehicle.service';
import { ReportService }  from '../../services/report.service';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    SidebarComponent
  ],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  vehicles: any[] = [];
  reports: any[] = [];
  filter = {
    vehicleId: '',
    startDate: '',
    endDate: ''
  };
  selectedReport: any = null;  // ✨ Add this line
  
  constructor(
    private vs: VehicleService,
    private rs: ReportService
  ) {}

  ngOnInit() {
    const email = localStorage.getItem('userEmail')!;
    // load vehicles for filter dropdown
    this.vs.getVehiclesByOwner(email).subscribe(vs => this.vehicles = vs);
    // initial load (all)
    this.loadReports();
  }

  loadReports() {
    const email = localStorage.getItem('userEmail')!;
    this.rs.getReports(email, this.filter).subscribe(
      reps => this.reports = reps,
      err  => console.error('Load reports failed', err)
    );
  }


  downloadSelectedReportPDF() {
    const element = document.getElementById('report-detail-content');
    if (!element) return;

    const opt = {
      margin:       0.5,
      filename:     `prediction-report-${new Date().toISOString()}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save();
  }


  viewReport(report: any) {
    this.selectedReport = report;  // ✨ Assign report to selectedReport
  }


  getEngineTempClass(temp: number): string {
    if (temp > 105) return 'text-red-600 font-bold';
    if (temp < 70) return 'text-blue-600 font-bold';
    return '';
  }

  getBatteryClass(voltage: number): string {
    if (voltage > 13.5 || voltage < 10) return 'text-red-600 font-bold';
    return '';
  }

  getTirePressureClass(psi: number): string {
    if (psi > 40 || psi < 26) return 'text-red-600 font-bold';
    return '';
  }



  applyFilters() {
    this.loadReports();
  }

  clearFilters() {
    this.filter = { vehicleId:'', startDate:'', endDate:'' };
    this.loadReports();
  }

  // viewReport(id: string) {
  //   // e.g. open a detail modal
  //   alert(`Viewing report ${id}`);
  // }

  downloadCSV() {
    // simple CSV download of displayed table
    const headers = ['Report Name','Vehicle','Type','Date Range','Generated On'];
    const rows = this.reports.map(r => [
      r.name || 'Report',
      `${r.vehicleId.make} ${r.vehicleId.model}`,
      r.type || '—',
      `${new Date(r.startDate).toLocaleDateString()} - ${new Date(r.endDate).toLocaleDateString()}`,
      new Date(r.createdAt).toLocaleString()
    ]);
    let csv = headers.join(',') + '\n'
            + rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'reports.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  downloadPDF() {
    const element = document.getElementById('reportTable')!;
    html2pdf().from(element).set({ margin:1 }).save('reports.pdf');
  }

  generateNewReport() {
    alert('Report generation wizard would open here');
  }

}
