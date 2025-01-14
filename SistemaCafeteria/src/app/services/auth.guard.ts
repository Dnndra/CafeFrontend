import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    const userRole = this.authService.getRole();
    const requiredRole = route.data['role'];

    if (isAuthenticated && (!requiredRole || userRole === requiredRole || userRole === 'admin')) {
      return true;
    }

    if (isAuthenticated && userRole !== requiredRole) {
      this.snackBar.open('No tienes permisos para acceder a esta opción', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      this.router.navigate(['/purchase']);
      return false;
    }

    this.router.navigate(['/login']);
    return false;
  }
}