import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private base = 'http://localhost:5000/api/reports';
  constructor(private http: HttpClient) {}
  
  getReports(email: string, filters: {
      vehicleId?: string;
      startDate?: string;
      endDate?: string;
    } = {}): Observable<any[]> {
    let params = new HttpParams().set('email', email);
    if (filters.vehicleId)   params = params.set('vehicleId', filters.vehicleId);
    if (filters.startDate)   params = params.set('startDate', filters.startDate);
    if (filters.endDate)     params = params.set('endDate', filters.endDate);
    return this.http.get<any[]>(`${this.base}/user/${email}`, { params });
  }
}
