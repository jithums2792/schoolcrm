import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import * as xml2js from 'xmltojson'
import { LivestreamService } from 'src/app/services/livestream.service';
import * as uuid from 'uuid';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bbb',
  templateUrl: './bbb.component.html',
  styleUrls: ['./bbb.component.css']
})
export class BbbComponent implements OnInit {
  public data 
  public section
  public socket 
  public teacher = {
    usertype: 'teacher',
    room: 'try',
    password: '',
    meetingID: ''
  }

  constructor(private router: Router, 
              private sanitiser: DomSanitizer,
              private toastservice: ToastrService,
              private liveservice: LivestreamService) { 
    try {
      this.section = this.router.getCurrentNavigation().extras.state.value
      
    } catch (error) {
     router.navigate(['/teacher/home/class'])
    }
  }

  ngOnInit() {
    this.socket = io.connect(environment.socket)
    this.socket.on('joined', (data) => console.log(data))
    this.navigate(this.section)
  }


  async navigate(section:string) {
    const meetingid = uuid.v4()
    this.teacher.meetingID = meetingid
    this.teacher.room = section.replace(/\s/g, "")
    this.liveservice.createmeeting({name: section.replace(/\s/g, ""), meetingID: meetingid })
    .subscribe(res => {
      res = xml2js.parseString(res)
      console.log(res)
      if (res.response[0].returncode[0]._text === 'FAILED') {
        this.toastservice.error(res.response[0].messageKey[0]._text, res.response[0].message[0]._text)
      } else {
       this.join(res.response[0])
      }
    })
  }

  async join(data) {
    this.teacher.password = data.attendeePW[0]._text
    this.socket.emit('join', this.teacher)
    this.liveservice.joinmeeting({
     name: localStorage.getItem('teachername').replace(/\s/g, ""), 
     meetingID: data.meetingID[0]._text, 
     password: data.moderatorPW[0]._text
     }).then(data => {
      this.data = this.sanitiser.bypassSecurityTrustResourceUrl(data)
     })
  }

  ngOnDestroy() {
    this.socket.disconnect()
  }

}
