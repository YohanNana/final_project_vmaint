import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    // Add any other modules you need here, e.g., FormsModule, ReactiveFormsModule, etc.
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {

  logout() {
    localStorage.removeItem('authToken');
    // window.location.href = '/login';
  }

  generateNewReport() {
    alert('Report generation wizard would open here');
  }

  viewReport(id: number) {
    alert(`Viewing report ${id}`);
  }

  downloadReport(id: number, format: string) {
    alert(`Downloading report ${id} as ${format.toUpperCase()}`);
  }

  useTemplate(id: number) {
    alert(`Using template ${id} for new report`);
  }

  ngOnInit() {
    if (!localStorage.getItem('authToken')) {
      // window.location.href = '/login';
    }
  }

}
