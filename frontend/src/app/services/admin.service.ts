import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// services/admin.service.ts
@Injectable({ providedIn: 'root' })
export class AdminService {
  private base = 'http://localhost:5000/api/admin';  // ← admin base

  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get<any[]>(`${this.base}/users`);
  }

  getAllVehicles() {
    return this.http.get<any[]>(`${this.base}/vehicles`);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.base}/users/${id}`);
  }

  banUser(id: string) {
    return this.http.put<any>(`${this.base}/users/${id}/ban`, {});
  }

  getStats() {
    return this.http.get(`${this.base}/stats`);
  }

}
