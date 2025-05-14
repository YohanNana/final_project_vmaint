import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  private apiUrl = 'http://localhost:5000/api/maintenance';

  constructor(private http: HttpClient) {}

  // Fetch all maintenance records for a specific user
  getMaintenanceByUser(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${email}`);
  }

  // Fetch maintenance records for a specific vehicle
  getMaintenanceByVehicle(vehicleId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/vehicle/${vehicleId}`);
  }

  // Add a new maintenance record
  addMaintenance(record: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, record);
  }

  // Optional: Edit a record
  updateMaintenance(id: string, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updatedData);
  }

  // Optional: Delete a record
  deleteMaintenance(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
