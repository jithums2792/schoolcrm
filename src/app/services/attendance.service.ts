import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  public api = environment.api


  constructor(private http: HttpClient) { }

  addAttendance(data): Observable<any> {
    return this.http.post(this.api + 'attendance/create', data);
  }
  getAttendancebyQuery(data): Observable<any> {
    return this.http.post(this.api + 'attendance/query', data);
  }
}
