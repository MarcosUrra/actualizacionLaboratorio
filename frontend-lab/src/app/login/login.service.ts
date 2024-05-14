import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  token = '';
  private readonly ROLE_KEY = 'userRole';
  private Urlback = 'http://localhost:3000';
  private role: string = '';

  constructor(private http: HttpClient) { }

  getRole(): string {
    return localStorage.getItem(this.ROLE_KEY) || this.role;
  }

  setRole(newRole: string): void {
    localStorage.setItem(this.ROLE_KEY, newRole);
    this.role = newRole;
    this.token = newRole;
  }

  autenticarUsuario(username: string, password: string, role: string) {
    const data = { username, password, role };
    return this.http.post(`${this.Urlback}/usuarios/login`, data);
  }

  isAuth() {

    return localStorage.getItem('userRole') ? true : false;
  }
  isUser() {
    return localStorage.getItem('userRole') == 'admin' ? true : false;
  }
}
