import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
public api = environment.api;
  constructor(private http: HttpClient) { }

  getDepartmentList(): Observable<any> {
    return this.http.get(this.api + 'department/all');
  }

  addDepartment(department): Observable<any> {
    return this.http.post(this.api + 'department/create', department);
  }

  updateDepartment(id, department): Observable<any> {
    return this.http.patch(this.api + 'department/update/' + id, department);
  }

  deleteDepartment(departmentId): Observable<any> {
    return this.http.delete(this.api + 'department/delete/' + departmentId);
  }
}
