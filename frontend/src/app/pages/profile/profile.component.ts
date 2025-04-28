import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component'; // 👈 Import Navbar
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NavbarComponent, // 👈 Add Navbar here
    CommonModule, 
    RouterModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  isEditMode = false;

  logout() {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  cancelEdit() {
    this.isEditMode = false;
  }

  saveProfile() {
    alert('Profile changes saved successfully!');
    this.isEditMode = false;
  }
}
