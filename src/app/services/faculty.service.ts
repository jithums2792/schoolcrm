import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  public api = environment.api;

  constructor(private http: HttpClient, private toastservice: ToastrService) { }

  getAllstaff(): Observable<any> {
    return this.http.get(this.api + 'teacher/all');
  }
  getFacultyinfoByid(id):Observable<any> {
    return this.http.get(this.api + 'teacher/teacher/'+ id);
  }
  addFaculty(faculty): Observable<any> {
    return this.http.post(this.api + 'teacher/create', faculty);
  }
  updateFaculty(id, faculty): Observable<any> {
    return this.http.patch(this.api + 'teacher/update/' + id, faculty);
  }
  deleteFaculty(id) : Observable<any> {
    return this.http.delete(this.api + 'teacher/delete/' + id);
  }
  login(data): Observable<any> {
    return this.http.post(this.api + 'teacher/login', data);
  }
}
