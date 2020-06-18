import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {
  public api = environment.api;

  constructor(private http: HttpClient) { }

  getAllFile(): Observable<any> {
    return this.http.get(this.api + 'file/all');
  }

  addFile(file):Observable<any> {
    return this.http.post(this.api + 'file/create', file);
  }

  getAllfileByroomAndSection(room, section): Observable<any> {
    return this.http.get(this.api + 'file/room/' + room + '/' + section);
  }

  updateFile(id, data): Observable<any> {
    return this.http.patch(this.api + 'file/update/' + id, data);
  }

  deleteFilebyId(id): Observable<any> {
    return this.http.delete(this.api + 'file/delete/' + id);
  }
}
