import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    NavbarComponent,
    DatePipe
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {

  notifications: any[] = [];
  email = localStorage.getItem('userEmail')!;

  // ✅ Add missing properties for notification settings
  emailNotifications = false;
  smsAlerts = false;
  pushNotifications = false;

  constructor(private ns: NotificationService) {
    // Optionally implement or remove this
    // this.checkAuth();
  }

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.ns.list(this.email).subscribe((n: any) => {
      this.notifications = Array.isArray(n) ? n : [];
    });
  }

  markAllAsRead() {
    this.ns.markAllRead(this.email).subscribe(() => this.loadNotifications());
  }

  clearAll() {
    if (confirm('Are you sure?')) {
      this.ns.clearAll(this.email).subscribe(() => this.loadNotifications());
    }
  }

  // ✅ Add missing method
  saveSettings() {
    // You can send this data to the server or just console.log
    console.log({
      emailNotifications: this.emailNotifications,
      smsAlerts: this.smsAlerts,
      pushNotifications: this.pushNotifications
    });
  }

  // ✅ Optional: Remove this method or implement it properly
  // private checkAuth() {
  //   // implement if needed
  // }
}
