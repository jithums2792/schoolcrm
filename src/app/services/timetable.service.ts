import { Injectable } from '@angular/core';
import { environment  } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  public api = environment.api;


  constructor(private http: HttpClient) { }

  getAlltimetable(): Observable<any> {
    return this.http.get(this.api + 'timetable/all');
  }

  addtimetable(data): Observable<any> {
    return this.http.post(this.api + 'timetable/create', data);
  }

  updatetimetable(id, data): Observable<any> {
    console.log(id)
    return this.http.patch(this.api + 'timetable/update/' + id, data);
  }

  deletetimetable(id) : Observable<any> {
    return this.http.delete(this.api + 'timetable/delete/' + id);
  }
}
