import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public api = environment.api


  constructor(private http: HttpClient) { }

  getAllchat(): Observable<any> {
    return this.http.get(this.api + 'chat/all');
  }
  addchat(chat): Observable<any> {
    return this.http.post(this.api + 'chat/create' ,chat);
  }
  getchatbyCategory(query): Observable<any> {
    return this.http.post(this.api + 'chat/query',query);
  }
  updatechat(id,chat):Observable<any> {
    return this.http.patch(this.api + 'chat/update/' + id, chat);
  }
  deletechat(id): Observable<any> {
    return this.http.delete(this.api + 'chat/delete/' + id);
  }
}
