import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:5000/api/vehicles';

  constructor(private http: HttpClient) {}

  // ✅ Fix for registering a new vehicle (POST to correct endpoint)
  registerVehicle(vehicleData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, vehicleData); // No /register here!
  }


  getVehiclesByOwner(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/owner/${email}`);
  }
  
  getVehicleById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  

  // getVehicleById(id: string): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/${id}`);
  // }
  
  getVehicles(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
