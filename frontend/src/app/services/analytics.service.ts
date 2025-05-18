import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private apiUrl = 'http://localhost:5000/api/analytics';

  constructor(private http: HttpClient) {}

  getAnalytics(email: string, vehicleId: string): Observable<any> {
    let params = new HttpParams().set('email', email);
    if (vehicleId) params = params.set('vehicleId', vehicleId);
    return this.http.get<any>(this.apiUrl, { params });
  }
}
