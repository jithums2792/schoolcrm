import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, NavigationExtras } from '@angular/router';
import { StudentsService } from 'src/app/services/students.service';
import { TimetableService } from 'src/app/services/timetable.service';
import { ExamService } from 'src/app/services/exam.service';
import { AttendanceService } from 'src/app/services/attendance.service';
import { ToastrService } from 'ngx-toastr';
import { LivestreamService } from 'src/app/services/livestream.service';

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
  public timetableQuery = {
    name: localStorage.getItem('studentclass'),
    section: localStorage.getItem('studentsection')
  }
  public timetable = []
  public socket
  public subject = null
  public liveFlag = false
  public student = {
    usertype: 'student',
    room: localStorage.getItem('studentclass').replace(/\s/g, "")

  }
  public meeting

  
  constructor(private sanitizer: DomSanitizer, 
              private router: Router,
              private toast: ToastrService,
              private attendanceservice: AttendanceService,
              private liveservice: LivestreamService, 
              private examservice: ExamService,
              private timetableservice: TimetableService,
              private studentservice: StudentsService) { }



  async ngOnInit() {
    this.getstudentinfo();
    this.getTimetable()
    this.socket = io.connect(environment.socket)
    this.socket.on('connection', data => {
      this.socket.emit('join', this.student)
    })
    
    this.socket.on('joined', data => {
      if(data.status) {
        this.liveFlag = data.status
        this.meeting = data.data
        this.subject = data.data.room
      }
    })
    this.socket.on('live', data => {
      (data.status)? this.liveFlag = true: this.liveFlag = false
      this.meeting = data.data
      this.subject = data.data.room
    })
    
  }

  async getstudentinfo() {
    this.studentservice.getStudentbyid(localStorage.getItem('student')).subscribe(data => this.studentInfo = data.data);
  }

  async getTimetable() {
    this.timetableservice.gettimetableByQuery(this.timetableQuery).subscribe(data => {
      this.timetable = data.data
      console.log(this.timetable)
    })
  }
navigate2() {
  this.liveservice.joinmeeting({
    name: localStorage.getItem('studentname'),
    meetingID: this.meeting.meetingID,
    password: this.meeting.password
  }).then(data => {
    const option:NavigationExtras = {
      state: {value: data}
    }
    this.router.navigate(['/student/home/bbb'], option)
  })
}

async punch() {
  this.examservice.getCurrentTime().subscribe(async data =>{
    let attendance = {
        date: data.datetime.substring(0,10),
        time: data.datetime.substring(11,16),
        userId: localStorage.getItem('student'),
        class: localStorage.getItem('studentclass'),
        section: localStorage.getItem('studentsection'),
        username: localStorage.getItem('studentname'),
    }
    this.attendanceservice.addAttendance(attendance).subscribe(data => {
      if (data.status === 'success') {
        this.toast.success('puched successfully')
      } else {
        this.toast.error(data.data.message)
      }
    })
  })
}
   
}


