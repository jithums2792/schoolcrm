import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FacultyService } from 'src/app/services/faculty.service';
import { ToastrService } from 'ngx-toastr';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {
  public classList = []
  public sectionList = []
  public subjectList = []
  public examList = []
  public staffInfo
  public query = {
    class: null,
    section: null,
    subject: null,
    teacher: null
  }

  constructor(private router: Router,
              private staffservice: FacultyService,
              private toastservice: ToastrService,
              private examservice: ExamService) { }

  ngOnInit() {
    this.getStaffinfo()
    this.getAllExam()
  }

  getStaffinfo() {
    this.staffservice.getFacultyinfoByid(localStorage.getItem('teacher')).subscribe(data => {
      this.staffInfo = data.data
      this.classList = this.staffInfo.assignedClass
      this.subjectList = this.staffInfo.assignedSubject
      this.query.teacher = this.staffInfo.firstname
    })
  }
  
  async getAllExam() {
    this.examservice.getAllExam().subscribe(data => console.log(data))
  }

  async classSelection(room) {
    if (room.value !== 'null') {
      this.query.class = room.value
      this.classList.find(element => (element.room === room.value)? this.sectionList = element.section: null)
    } else {
      this.toastservice.warning('please select a class', 'Warning')
      this.sectionList = []
    }
  }

  async sectionSelection(section) {
    if (section.value !== 'null') {
      this.query.section = section.value
    } else {
      this.toastservice.warning('please select a section', 'Warning')
    }
  }

  async subjectSelection(subject) {
    if (subject.value !== 'null') {
      this.query.subject = subject.value
    } else {
      this.toastservice.warning('please select a subject', 'Warning')
    }
  }

  async search() {
    this.examservice.getExambyCategory(this.query).subscribe(data => (data.status === 'success')? this.examList = data.data: this.toastservice.error(data.data,data.status))
  }

  async edit(exam) {
    console.log('exam', exam)
    const options : NavigationExtras = {
      state: {data: exam}
    }
    this.router.navigate(['/teacher/home/createexam'], options)
  }

}
