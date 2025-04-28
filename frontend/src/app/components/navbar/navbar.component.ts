import { Component } from '@angular/core';
import { Router , RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true, // 👈 Must be standalone
  imports: [RouterModule], // 👈 Needed because you are using routerLink
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  
  constructor(private router: Router) {}

  logout() {
    document.body.classList.remove('logged-in');
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  toggleMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    if (menu) {
      menu.classList.toggle('hidden');
    }
  }


  sidebarOpen = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

}
