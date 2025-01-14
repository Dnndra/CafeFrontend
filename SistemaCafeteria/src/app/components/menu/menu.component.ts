import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(public authService: AuthService, private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}