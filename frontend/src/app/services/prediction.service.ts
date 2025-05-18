import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  // private apiUrl = 'http://localhost:5000/predict';
  private url = 'http://localhost:5000/api/predictions';

  constructor(private http: HttpClient) {}

  // predictMaintenance(data: any): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, data);
  // }

   save(pred: any): Observable<any> {
    return this.http.post(this.url, pred);
  }

  listByUser(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/user/${email}`);
  }

}
