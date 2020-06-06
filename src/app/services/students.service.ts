import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  public api = environment.api;

  constructor(private http: HttpClient) { }

  getAllStudent(): Observable<any> {
    return this.http.get(this.api + 'student/all');
  }

  getStudentsListByClass(classname, section): Observable<any> {
    return this.http.get(this.api + 'student/class/' + classname + '/' + section);
  }

  addStudent(student): Observable<any> {
    return this.http.post(this.api + 'student/create', student);
  }

  updateStudent(id, student): Observable<any> {
    return this.http.patch(this.api + 'student/update/' + id, student);
  }

  deleteStudent(id): Observable<any> {
    return this.http.delete(this.api + 'student/delete/' + id);
  }

  login(data): Observable<any> {
    return this.http.post(this.api + 'student/login',data);
  }
}
