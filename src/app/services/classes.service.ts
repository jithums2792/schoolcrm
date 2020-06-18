import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {
  public api = environment.api;


  constructor(private http: HttpClient) { }

  getAllclass(): Observable<any> {
    return this.http.get(this.api + 'class/all');
  }

  addClass(data): Observable<any> {
    return this.http.post(this.api + 'class/create', data);
  }

  updateClass(id, data): Observable<any> {
<<<<<<< HEAD
=======
    console.log(id)
>>>>>>> 1d8c923a71a4c457eb16f361e47f453c65296927
    return this.http.patch(this.api + 'class/update/' + id, data);
  }

  deleteClass(id) : Observable<any> {
    return this.http.delete(this.api + 'class/delete/' + id);
  }
}
