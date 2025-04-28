import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NavbarComponent,
    // Add any other components or modules you need to import here
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {

  emailNotifications = true;
  smsAlerts = true;
  pushNotifications = false;

  constructor(private router: Router) {
    this.checkAuth();
  }

  checkAuth() {
    const token = localStorage.getItem('authToken');
    // if (!token) {
    //   this.router.navigate(['/login']);
    // }
  }

  // logout() {
  //   localStorage.removeItem('authToken');
  //   this.router.navigate(['/login']);
  // }

  markAllAsRead() {
    alert('All notifications marked as read');
    // In a real app, you'd call a service to mark them
  }

  clearAll() {
    if (confirm('Are you sure you want to clear all notifications?')) {
      alert('All notifications cleared');
      // Here, you'd clear notifications from backend or state
    }
  }

  saveSettings() {
    alert('Notification settings saved');
    // Here you could save settings to a backend
  }

}
