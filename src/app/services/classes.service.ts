import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {
  public api = environment.api;


  constructor(private http: HttpClient) { }

  getAllclass(): Observable<any> {
    return this.http.get(this.api + 'class/all');
  }

  addClass(data): Observable<any> {
    return this.http.post(this.api + 'class/create', data);
  }

  updateClass(id, data): Observable<any> {
    return this.http.patch(this.api + 'class/update/' + id, data);
  }

  deleteClass(id) : Observable<any> {
    return this.http.delete(this.api + 'class/delete/' + id);
  }
}
