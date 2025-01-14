import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  private token: string | null = null;
  private userRole: string | null = null;
  private userName: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
      this.userRole = localStorage.getItem('role');
    }
  }

  login(username: string, password: string): Promise<boolean> {
    return this.http.post<{ message: string, token: string, user: { id: number, username: string, role: string } }>(`${this.apiUrl}/auth/login`, { username, password })
      .toPromise()
      .then(response => {
        if (response) {
          this.token = response.token;
          this.userRole = response.user.role;
          this.userName = response.user.username;
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('token', this.token);
            localStorage.setItem('role', this.userRole);
          }
        }
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  logout(): void {
    this.token = null;
    this.userRole = null;
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getRole(): string | null {
    return this.userRole;
  }
  getUsername(): string | null {
    return this.userName;
  }
}