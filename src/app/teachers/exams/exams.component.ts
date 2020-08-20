import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FacultyService } from 'src/app/services/faculty.service';
import { ToastrService } from 'ngx-toastr';
import { ExamService } from 'src/app/services/exam.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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
  public classList2 = []
  public sectionList2 = []
  public subjectList2 = []
  public examList2 = []
  public staffInfo
  public query = {
    class: null,
    section: null,
    subject: null,
    teacher: null
  }
  public query2 = {
    class: null,
    section: null,
    subject: null,
    teacher: null
  }
  public modalRef: BsModalRef;
  public exam
  public index

  constructor(private router: Router,
              private staffservice: FacultyService,
              private toastservice: ToastrService,
              private modalService: BsModalService,
              private examservice: ExamService) { }

  ngOnInit() {
    this.getStaffinfo()
  }

  openModal(template: TemplateRef<any>, exam, index) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    this.exam = exam
    this.index = index
  }
 
  confirm(): void {
    this.examservice.deleteExam(this.exam._id).subscribe(data => {
      if (data.status === 'success') {
        this.toastservice.success('Deleted', 'Success')
        this.examList.splice(this.index, 1)
        this.modalRef.hide();
      } else {
        this.toastservice.error('Something wrong', 'Error')
      }
    })
  }
 
  decline(): void {
    console.log('declined')
    this.modalRef.hide();
  }

 
  confirm2(): void {
    this.examservice.deleteSubExam(this.exam._id).subscribe(data => {
      if (data.status === 'success') {
        this.toastservice.success('Deleted', 'Success')
        this.examList2.splice(this.index, 1)
        this.modalRef.hide();
      } else {
        this.toastservice.error('Something wrong', 'Error')
      }
    })
  }
 


  getStaffinfo() {
    this.staffservice.getFacultyinfoByid(localStorage.getItem('teacher')).subscribe(data => {
      this.staffInfo = data.data
      this.classList = this.staffInfo.assignedClass
      this.subjectList2 = this.staffInfo.assignedSubject
      this.classList2 = this.staffInfo.assignedClass
      this.subjectList = this.staffInfo.assignedSubject
      this.query.teacher = this.staffInfo.firstname
      this.query2.teacher = this.staffInfo.firstname+' '+this.staffInfo.lastname
    })
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
  async classSelection2(room) {
    if (room.value !== 'null') {
      this.query2.class = room.value
      this.classList2.find(element => (element.room === room.value)? this.sectionList2 = element.section: null)
    } else {
      this.toastservice.warning('please select a class', 'Warning')
      this.sectionList2 = []
    }
  }

  async sectionSelection(section) {
    if (section.value !== 'null') {
      this.query.section = section.value
    } else {
      this.toastservice.warning('please select a section', 'Warning')
    }
  }
  async sectionSelection2(section) {
    if (section.value !== 'null') {
      this.query2.section = section.value
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
  async subjectSelection2(subject) {
    if (subject.value !== 'null') {
      this.query2.subject = subject.value
    } else {
      this.toastservice.warning('please select a subject', 'Warning')
    }
  }

  async search() {
    this.examservice.getExambyCategory(this.query).subscribe(data => {
      if (data.data.length > 0 ) {
        this.examList = data.data
      } else {
        this.toastservice.warning('Nole exam for this class and section', 'Warning')
      }
    })
  }
  async search2() {
    this.examservice.getSubExambyCategory(this.query2).subscribe(data => {
      if (data.data.length > 0 ) {
        this.examList2 = data.data
      } else {
        this.toastservice.warning('Nole exam for this class and section', 'Warning')
      }
    })
  }

  async edit(exam) {
    const options : NavigationExtras = {
      state: {data: exam}
    }
    this.router.navigate(['/teacher/home/createexam'], options)
  }
  async edit2(exam) {
    const options : NavigationExtras = {
      state: {data: exam}
    }
    this.router.navigate(['/teacher/home/subjectiveexam'], options)
  }

  async delete(exam) {

  }

  async resultList(exam) {
    const options: NavigationExtras = {
      state: {data: exam}
    }
    this.router.navigate(['/teacher/home/answerlist'], options)
  }
  async resultList2(exam) {
    const options: NavigationExtras = {
      state: {data: exam}
    }
    this.router.navigate(['/teacher/home/answerlist'], options)
  }

}
