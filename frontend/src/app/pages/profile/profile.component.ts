import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports:[
            NavbarComponent, 
            CommonModule, 
            RouterModule, 
            FormsModule
          ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isEditMode = false;

  // Define user properties
  firstName: string = '';
  lastName: string = '';
  email: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.firstName = localStorage.getItem('userFirstName') || '';
    this.lastName = localStorage.getItem('userLastName') || '';
    this.email = localStorage.getItem('userEmail') || '';
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
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
