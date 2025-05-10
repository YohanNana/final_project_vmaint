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
        this.message = 'Login successful!';
        this.router.navigate(['/dashboard']); // change to your desired route
      },
      error: err => {
        this.message = err.error.msg || 'Login failed.';
      }
    });
  }
}