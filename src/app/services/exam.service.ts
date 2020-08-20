import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  public api = environment.api
  public time = 'https://worldtimeapi.org/api/timezone/Asia/Kolkata'
  public exam;


  constructor(private http: HttpClient) { }

  getAllExam(): Observable<any> {
    return this.http.get(this.api + 'exam/all');
  }
  addExam(exam): Observable<any> {
    return this.http.post(this.api + 'exam/create' ,exam);
  }
  getExambyCategory(category): Observable<any> {
    return this.http.post(this.api + 'exam/category',category);
  }
  updateExam(id,exam):Observable<any> {
    return this.http.patch(this.api + 'exam/update/' + id, exam);
  }
  deleteExam(id): Observable<any> {
    return this.http.delete(this.api + 'exam/delete/' + id);
  }
  getCurrentTime():Observable<any> {
    return this.http.get(this.time);
  }

  setexam(exam) {
    this.exam = exam
  }
  getexam() {
    return this.exam
  }


  getAllSubExam(): Observable<any> {
    return this.http.get(this.api + 'subexam/all');
  }
  addSubExam(exam): Observable<any> {
    return this.http.post(this.api + 'subexam/create' ,exam);
  }
  getSubExambyCategory(category): Observable<any> {
    return this.http.post(this.api + 'subexam/category',category);
  }
  updateSubExam(id,exam):Observable<any> {
    return this.http.patch(this.api + 'subexam/update/' + id, exam);
  }
  deleteSubExam(id): Observable<any> {
    return this.http.delete(this.api + 'subexam/delete/' + id);
  }
}
