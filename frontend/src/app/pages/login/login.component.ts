import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
    
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const credentials = {
      email: this.email,
      password: this.password
    };
  
    this.authService.login(credentials.email, credentials.password).subscribe({
      next: res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userFirstName', res.user.firstName);
        localStorage.setItem('userLastName', res.user.lastName);
        localStorage.setItem('userEmail', res.user.email); // ✅ fix
        localStorage.setItem('userPhone', res.user.phone || '');
        localStorage.setItem('userAccountType', res.user.accountType);
        localStorage.setItem('userCreatedAt', res.user.createdAt);

        this.message = 'Login successful!';
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        this.message = err.error.msg || 'Login failed.';
      }
    });
    
  }
}