import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, NavigationExtras } from '@angular/router';
import { StudentsService } from 'src/app/services/students.service';

declare var gapi: any;
@Component({
  selector: 'app-studentclass',
  templateUrl: './studentclass.component.html',
  styleUrls: ['./studentclass.component.css']
})
export class StudentclassComponent implements OnInit {
  public apikey = 'AIzaSyCgvnKQ-ekScmDrSTpPkdneNmX77m4-en4';
  public clientId = '291458128144-h3g9751gllmctvv5av2ev4to34k9q07q.apps.googleusercontent.com';
  public videoId;
  public playListId = '';
  public url;
  public trustedUrl;
  public studentInfo;
  

  
  constructor(private sanitizer: DomSanitizer, private router: Router, private studentservice: StudentsService) { }



  async ngOnInit() {
    this.getstudentinfo();
  }

  async getstudentinfo() {
    this.studentservice.getStudentbyid(localStorage.getItem('student')).subscribe(data => this.studentInfo = data.data);
  }

  authenticate() {
    return gapi.auth2.getAuthInstance().signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"}).
    then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }
  async load() {
    await gapi.client.setApiKey("AIzaSyCgvnKQ-ekScmDrSTpPkdneNmX77m4-en4");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API");},
              function(err) { console.error("Error loading GAPI client for API", err); });
  }

  
  
async navigate() {
 await this.authenticate().then(this.load());
 await gapi.client.youtube.playlistItems.list({
  "part": [
    "snippet,contentDetails"
  ],
  "playlistId": "PLNigsc54Y10S1GCv46if9UjOFooAoDJFd",
  "maxResults": 25
}).then(async data => {
  const videoList = await  data.result.items;
  videoList.forEach(async item => {
    this.playListId = await item.snippet.playlistId;
    this.videoId = await item.contentDetails.videoId;
    this.url = `https://www.youtube.com/embed/${this.videoId}?list=${this.playListId}`;
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  });
}, err => console.log(err))
  
  const options: NavigationExtras = {
    state: {data: this.trustedUrl}
  };
  this.router.navigate(['/student/home/liveclass'], options);
}

navigate2() {
  this.router.navigate(['/student/home/liveclass2']);
}
   
}


