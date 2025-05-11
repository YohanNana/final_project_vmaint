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

  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  accountType = 'Vehicle Owner';
  memberSince = '';

  constructor(private router: Router, private authService: AuthService) {}

  originalEmail = ''; // Add this line

  ngOnInit() {
    const email = localStorage.getItem('userEmail');
    if (email) {
      this.authService.getUserByEmail(email).subscribe(user => {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.phone = user.phone;
        this.accountType = user.accountType;
        this.memberSince = new Date(user.createdAt).toLocaleDateString();
  
        // Update sidebar name
        localStorage.setItem('userFirstName', this.firstName);
        localStorage.setItem('userLastName', this.lastName);
      });
    }
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
    const email = localStorage.getItem('userEmail');
    const updatedData = {
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      accountType: this.accountType
    };
  
    if (email) {
      this.authService.updateUserByEmail(email, updatedData).subscribe({
        next: () => {
          alert('Profile updated');
          this.isEditMode = false;
          this.ngOnInit(); // reload updated data
        },
        error: err => {
          console.error(err);
          alert('Update failed.');
        }
      });
    }
  }
  
  
  
  
}
