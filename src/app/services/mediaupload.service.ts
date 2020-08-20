import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediauploadService {
  public api = environment.api;


  constructor(private http: HttpClient) { }

  getAllmedia(): Observable<any> {
    return this.http.get(this.api + 'media/all');
  }
  addmedia(media): Observable<any> {
    return this.http.post(this.api + 'media/create',media)
  }
  getmediabyquery(query): Observable<any> {
    return this.http.post(this.api + 'media/query',query)
  }
  deletemedia(id): Observable<any> {
    return this.http.delete(this.api + 'media/delete/'+id)
  }
}
