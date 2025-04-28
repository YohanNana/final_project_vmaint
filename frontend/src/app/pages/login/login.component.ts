import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

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
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    // Mock login logic (replace with real auth later)
    localStorage.setItem('authToken', 'mock-token');
    document.body.classList.add('logged-in');
    this.router.navigate(['/dashboard']);
  }

  logout() {
    document.body.classList.remove('logged-in');
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }
}
