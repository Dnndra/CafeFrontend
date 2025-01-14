import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private router: Router, private authService: AuthService) {}

  async onLogin() {
    const success = await this.authService.login(this.username, this.password);
    if (success) {
      const role = this.authService.getRole();
      
        this.router.navigate(['/purchase']);
  
    } else {
      alert('Invalid credentials');
    }
  }
}