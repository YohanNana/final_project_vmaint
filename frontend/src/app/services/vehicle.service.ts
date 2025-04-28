import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:5000/api/vehicles';

  constructor(private http: HttpClient) { }

  getAllVehicles() {
    return this.http.get(this.apiUrl);
  }

  addVehicle(vehicle: any) {
    return this.http.post(this.apiUrl, vehicle);
  }

  // Add more methods as needed
}
