import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule, 
    NavbarComponent,
    FormsModule,
    RouterLink
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})

export class SettingsComponent {
  email = 'yohan.nana16@gmail.com';
  phone = '071-4378675';
  language = 'English';
  timezone = '(UTC+05:30) Asian Time';
  defaultUnit = 'Kilometers/Liters (Metric)';
  reminderThreshold = '2 weeks before due';

  notifications = [
    { title: 'Email Notifications', description: 'Receive important updates via email', enabled: true },
    { title: 'SMS Alerts', description: 'Get urgent reminders via text message', enabled: true },
    { title: 'Push Notifications', description: 'Enable app notifications on your device', enabled: false },
    { title: 'Maintenance Reminders', description: 'Get alerts for upcoming services', enabled: true }
  ];

  // Simple auth check
  // ngOnInit() {
  //   if (!localStorage.getItem('authToken')) {
  //     window.location.href = '/login.html';
  //   }
  // }

  // Logout function
  // logout() {
  //   localStorage.removeItem('authToken');
  //   window.location.href = '/login.html';
  // }

  // Save Settings function
  saveSettings() {
    // In a real app, this would save settings to an API
    alert('Settings saved successfully!');
  }

  // Confirm account deletion
  confirmDeleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // In a real app, this would delete the account
      alert('Account deletion would be processed here');
    }
  }

  // Export Data function
  exportData() {
    // In a real app, this would export user data
    alert('Data export would be processed here');
  }
}