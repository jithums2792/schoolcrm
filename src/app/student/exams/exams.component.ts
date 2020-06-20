import { Component, OnInit, TemplateRef  } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { StudentsService } from 'src/app/services/students.service';
import { ExamService } from 'src/app/services/exam.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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
  public currentTime:string
  public modalRef: BsModalRef;
  public exam
  public buttonFlag = true

  constructor(private router: Router,
              private studentservice: StudentsService,
              private modalService: BsModalService,
              private examservice: ExamService) { }

  ngOnInit() {
    this.getStudentinfo()
    this.getCurrentTime()
    // setInterval(() => {
    //    this.getCurrentTime()
    // },1000)
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
  }

  async navigate(exam, instruction: TemplateRef<any>) {
    this.modalRef = this.modalService.show(instruction, {class: 'modal-lg'})
    this.exam = exam
  }



  confirm(): void {
    const option: NavigationExtras = {
      state: {data: this.exam}
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

  
}
