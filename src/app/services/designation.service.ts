import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {
public api = environment.api;
  constructor(private http: HttpClient) { }

  getDesignationList(): Observable<any> {
    return this.http.get(this.api + 'designation/all');
  }

  addDesignation(designation): Observable<any> {
    return this.http.post(this.api + 'designation/create', designation);
  }

  updateDesignation(id, designation): Observable<any> {
    return this.http.patch(this.api + 'designation/update/' + id, designation);
  }

  deleteDesignation(designationId): Observable<any> {
    return this.http.delete(this.api + 'designation/delete/' + designationId);
  }
}


