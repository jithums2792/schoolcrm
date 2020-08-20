import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  public api = environment.api


  constructor(private http: HttpClient) { }

  getAllanswer(): Observable<any> {
    return this.http.get(this.api + 'answer/all');
  }
  addanswer(answer): Observable<any> {
    return this.http.post(this.api + 'answer/create' ,answer);
  }
  getanswerbyCategory(category): Observable<any> {
    return this.http.post(this.api + 'answer/category',category);
  }
  updateanswer(id,answer):Observable<any> {
    return this.http.patch(this.api + 'answer/update/' + id, answer);
  }
  deleteanswer(id): Observable<any> {
    return this.http.delete(this.api + 'answer/delete/' + id);
  }

  getAllsubanswer(): Observable<any> {
    return this.http.get(this.api + 'subanswer/all');
  }
  addsubanswer(answer): Observable<any> {
    return this.http.post(this.api + 'subanswer/create' ,answer);
  }
  getsubanswerbyCategory(category): Observable<any> {
    return this.http.post(this.api + 'subanswer/category',category);
  }
  updatesubanswer(id,answer):Observable<any> {
    return this.http.patch(this.api + 'subanswer/update/' + id, answer);
  }
  deletesubanswer(id): Observable<any> {
    return this.http.delete(this.api + 'subanswer/delete/' + id);
  }
 
}
