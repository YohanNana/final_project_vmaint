import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component'; // 👈 Import Navbar
import { SidebarComponent } from '../../components/sidebar/sidebar.component'; // 👈 Import Sidebar
import { RouterModule } from '@angular/router'; // 👈 Needed for routerLink to work

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NavbarComponent, 
    SidebarComponent, 
    RouterModule     
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  toggleMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    menu?.classList.toggle('hidden');
  }

  logout() {
    document.body.classList.remove('logged-in');
    localStorage.removeItem('authToken');
    window.location.href = '/';
  }
}
