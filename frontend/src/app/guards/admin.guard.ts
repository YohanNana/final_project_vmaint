import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const userEmail = localStorage.getItem('userEmail');

    if (userEmail === 'admin@gmail.com') {
      return true; // ✅ allow access
    }

    // ❌ redirect others to dashboard (or login)
    this.router.navigate(['/dashboard']);
    return false;
  }
}
