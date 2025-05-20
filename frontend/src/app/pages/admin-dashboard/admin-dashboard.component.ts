import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    SidebarComponent
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})

export class AdminDashboardComponent implements OnInit {
  users: any[] = [];
  vehicles: any[] = [];
  stats: any = {};

  constructor(private adminService: AdminService) {}

    ngOnInit() {
      this.loadAdminData();
      this.adminService.getStats().subscribe({
        next: (data) => this.stats = data,
        error: (err) => console.error('Stats fetch error:', err)
      });
    }

    loadAdminData() {
      this.adminService.getAllUsers()
        .subscribe(u => this.users = u);
      this.adminService.getAllVehicles()
        .subscribe(v => this.vehicles = v);
    }


  deleteUser(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.adminService.deleteUser(id).subscribe(() => this.loadAdminData());
    }
  }

  banUser(id: string) {
    if (confirm('Are you sure you want to ban this user?')) {
      this.adminService.banUser(id).subscribe(() => this.loadAdminData());
    }
  }


}
