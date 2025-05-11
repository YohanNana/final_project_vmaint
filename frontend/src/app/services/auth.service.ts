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
    return this.http.post(`${this.baseUrl}/register`, {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
      accountType: userData.accountType
    });
  }
  

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }
  
  
  getUserByEmail(email: string) {
    return this.http.get<any>(`${this.baseUrl}/users/email/${email}`);
  }
  
  
  updateUserByEmail(email: string, updatedData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/user/${email}`, updatedData);
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
