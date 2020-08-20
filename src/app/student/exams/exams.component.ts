import { Component, OnInit, TemplateRef  } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { StudentsService } from 'src/app/services/students.service';
import { ExamService } from 'src/app/services/exam.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AnswerService } from 'src/app/services/answer.service';

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
  public answerQuery = {
    room: localStorage.getItem('studentclass'),
    section: localStorage.getItem('studentsection'),
    name: localStorage.getItem('studentname')
  }
  public studentInfo
  public examList = []
  public examList2 = []
  public answerList = []
  public currentTime:string
  public modalRef: BsModalRef;
  public exam
  public buttonFlag = true

  constructor(private router: Router,
              private studentservice: StudentsService,
              private modalService: BsModalService,
              private answerservice: AnswerService,
              private examservice: ExamService) { }

  ngOnInit() {
    this.getStudentinfo()
    this.getCurrentTime()
    this.getAnswerlist()
 }

  async getCurrentTime() {
    this.examservice.getCurrentTime().subscribe(async data => {
      this.currentTime = await data.datetime.substr(0,19)
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
    this.examservice.getSubExambyCategory(this.query).subscribe(data => this.examList2 = data.data)
  }

  async getAnswerlist() {
    console.log(this.answerQuery)
    this.answerservice.getanswerbyCategory(this.answerQuery).subscribe(data => {
      this.answerList = data.data
      console.log(this.answerList)
    })
  }

  async navigate(exam, instruction: TemplateRef<any>) {
    this.modalRef = this.modalService.show(instruction, {class: 'modal-lg'})
    this.exam = exam
  }



  confirm(): void {
    const option: NavigationExtras = {
      state: {data: this.exam, type: 'objective'}
    };
    this.router.navigate(['/student/home/attendexam'],option)
    this.modalRef.hide();
  }
  confirm2(): void {
    const option: NavigationExtras = {
      state: {data: this.exam, type: 'subective'}
    };
    this.router.navigate(['/student/home/attendexam'],option)
    this.modalRef.hide();
  }
 
  decline(): void {
    this.modalRef.hide();
  }

  buttonCtrl(value, index) {
    this.examList[index].active = value
  }
  buttonCtrl2(value, index) {
    this.examList2[index].active = value
  }

  
}
