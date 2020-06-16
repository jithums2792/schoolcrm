import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { StudentsService } from 'src/app/services/students.service';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {
  public query = {
    class: null,
    section: null
  }
  public studentInfo
  public examList = []
  public currentTime

  constructor(private router: Router,
              private studentservice: StudentsService,
              private examservice: ExamService) { }

  ngOnInit() {
    this.getStudentinfo()
    this.getCurrentTime()
  }

  async getCurrentTime() {
    this.examservice.getCurrentTime().subscribe(data => {
      this.currentTime = data.datetime.substr(0,16)
    })
  }

  async getStudentinfo() {
    this.studentservice.getStudentbyid(localStorage.getItem('student')).subscribe(data => {
      this.studentInfo = data.data
      this.query.class = this.studentInfo.class
      this.query.section = this.studentInfo.section
      this.getExamList()
    })
  }

  async getExamList() {
    this.examservice.getExambyCategory(this.query).subscribe(data => this.examList = data.data)
  }

  async navigate(exam) {
    // const option: NavigationExtras = {
    //   state: {data: exam}
    // };
    // this.router.navigate(['/student/home/attendexam'],option)
    this.examservice.setexam(exam);
  }

  
}
