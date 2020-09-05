import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/app/services/attendance.service';
import { ExamService } from 'src/app/services/exam.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  bsInlineValue
  public punchList = []
  public query = {
    query: {
      date: '',
      userId: ''
    },
    limit: 10,
    skip: 0
  }
  constructor(private attendanceservice: AttendanceService,
              private toast: ToastrService,
              private examservice: ExamService) { }

  ngOnInit() {
     this.gettime()
  }

  gettime() {
    this.examservice.getCurrentTime().subscribe(data => {
      this.bsInlineValue = new Date(data.datetime) 
    })
  }

  async check(event) {
    let date = event.toLocaleDateString('ln',{month: '2-digit',year: 'numeric', day: 'numeric'}).split('/')
    const temp = date[0]
    date[0] = date[1]
    date[1] = temp
    this.query.query.date = date.reverse().join('-')
    this.query.query.userId = localStorage.getItem('student')
    this.attendanceservice.getAttendancebyQuery(this.query).subscribe(data => {
      if(data.status === 'success' && data.data.length > 0) {
        this.punchList = data.data
      } else if(data.status === 'success' && data.data.length === 0) {
        this.punchList = []
        this.toast.warning('no puch list in this date')
      } else {
        this.toast.error(data.data.message)
        this.punchList = []
      }
    })
  }

}

