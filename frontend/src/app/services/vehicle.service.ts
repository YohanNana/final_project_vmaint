import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:5000/api/vehicles';

  constructor(private http: HttpClient) {}

  getVehicleById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  
  

  getVehicles(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
