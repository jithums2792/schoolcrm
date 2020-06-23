import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  public api = environment.api;


  constructor(private http: HttpClient) { }

  getAllleave(): Observable<any> {
    return this.http.get(this.api + 'leave/all');
  }

  getAllleaveByQuery(query):Observable<any> {
    return this.http.post(this.api + 'leave/query', query);
  }

  addleave(data): Observable<any> {
    return this.http.post(this.api + 'leave/create', data);
  }

  updateleave(id, data): Observable<any> {
    console.log(id)
    return this.http.patch(this.api + 'leave/update/' + id, data);
  }

  deleteleave(id) : Observable<any> {
    return this.http.delete(this.api + 'leave/delete/' + id);
  }
}
