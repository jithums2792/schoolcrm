import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticeboardService {
  public api = environment.api;


  constructor(private http: HttpClient) { }

  getAllnoticeboard(): Observable<any> {
    return this.http.get(this.api + 'noticeboard/all');
  }

  getAllnoticeboardByQuery(query):Observable<any> {
    return this.http.post(this.api + 'noticeboard/query', query);
  }

  addnoticeboard(data): Observable<any> {
    return this.http.post(this.api + 'noticeboard/create', data);
  }

  updatenoticeboard(id, data): Observable<any> {
    console.log(id)
    return this.http.patch(this.api + 'noticeboard/update/' + id, data);
  }

  deletenoticeboard(id) : Observable<any> {
    return this.http.delete(this.api + 'noticeboard/delete/' + id);
  }
}
