import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:5000/api/auth/login', { email, password });
  }
  
  getUserByEmail(email: string): Observable<any> {
    return this.http.get(`http://localhost:5000/api/auth/user/${email}`);
  }
  

  // login(credentials: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/login`, credentials);
  // }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
