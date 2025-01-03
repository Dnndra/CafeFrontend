import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(username: string, password: string): boolean {
    // Aquí iría la lógica real de autenticación (llamar a tu API de Node.js)
    // Por ahora, lo haremos básico con un usuario ficticio.
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('token', 'fake-jwt-token'); // Guardar un token en localStorage
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('token'); // Eliminar el token en logout
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Verificar si el token existe
  }
}
