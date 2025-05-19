// services/notification.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private base = 'http://localhost:5000/api/notifications';

  constructor(private http: HttpClient) {}

  list(email: string) {
    return this.http.get(`${this.base}/${email}`);
  }

  create(data: any) {
    return this.http.post(this.base, data);
  }

  markAllRead(email: string) {
    return this.http.put(`${this.base}/${email}/mark-all-read`, {});
  }

  clearAll(email: string) {
    return this.http.delete(`${this.base}/${email}/clear-all`);
  }
}
