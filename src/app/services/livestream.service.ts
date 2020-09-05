import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as xml2js from 'xmltojson'
import sha1 from 'crypto-js/sha1'
import { param } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class LivestreamService {
  public host =  environment.host
  public secret = environment.secret

  constructor(private http: HttpClient) { }

  createmeeting(params): Observable<any> {
    const url = `name=${params.name}&meetingID=${params.meetingID}`
    const checksum = this.checksumgen('create',url)
    return this.http.get(`${this.host}create?${url}&checksum=${checksum}`,{responseType: 'text'})
  }
  async joinmeeting(params) {
    const url = `fullName=${params.name}&meetingID=${params.meetingID}&password=${params.password}&joinViaHtml5=true`
    const checksum = this.checksumgen('join',url)
    return `${this.host}join?${url}&checksum=${checksum}`
  }

  checksumgen(method,url) {
    console.log(method+url+this.secret)
    return sha1(method+url+this.secret)
  }
}
