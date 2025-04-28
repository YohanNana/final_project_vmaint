import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-maintenance-history',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  templateUrl: './maintenance-history.component.html',
  styleUrl: './maintenance-history.component.css'
})
export class MaintenanceHistoryComponent {

  logout() {
    localStorage.removeItem('authToken');
    window.location.href = '/login.html';
  }

  addMaintenanceRecord() {
    alert('Add maintenance record functionality would be implemented here');
  }

  viewRecord(id: number) {
    alert(`Viewing maintenance record ${id}`);
  }

  editRecord(id: number) {
    alert(`Editing maintenance record ${id}`);
  }

  deleteRecord(id: number) {
    if (confirm(`Are you sure you want to delete record ${id}?`)) {
      alert(`Record ${id} deleted`);
    }
  }

}
