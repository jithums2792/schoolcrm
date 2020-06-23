import { Component, OnInit, TemplateRef  } from '@angular/core';
import { Router } from '@angular/router';
import { AnswerService } from 'src/app/services/answer.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-answerlist',
  templateUrl: './answerlist.component.html',
  styleUrls: ['./answerlist.component.css']
})
export class AnswerlistComponent implements OnInit {
  public exam
  public answerSheet
  public query = {
    examname: null,
    room: null,
    section: null,
    subject: null,
    teacher: null
  }
  public modalRef: BsModalRef;
  public answersheetList = []
  constructor(private router: Router,
    private modalService: BsModalService,
              private answerservice: AnswerService,
              private toastservice: ToastrService) { 
    try {
      this.exam = router.getCurrentNavigation().extras.state.data
      this.query.examname = this.exam.name
      this.query.room = this.exam.class
      this.query.section = this.exam.section
      this.query.subject = this.exam.subject
      this.query.teacher = this.exam.teacher

    } catch (error) {
      router.navigate(['/teacher/home/exams'])
      console.log('creativepanda')
    }
  }

  ngOnInit() {
    this.getAnswersheetList()
  }

  getAnswersheetList() {
    this.answerservice.getanswerbyCategory(this.query).subscribe(data => {
      if (data.data.length > 0) {
        this.answersheetList = data.data
      } else {
        this.toastservice.warning('No answerSheets')
        this.router.navigate(['/teacher/home/exams'])
      }
    })
  }

  openModal(template: TemplateRef<any>, sheet) {
    this.modalRef = this.modalService.show(template)
    this.answerSheet = sheet
  }

  submit() {
    this.answerservice.updateanswer(this.answerSheet._id, this.answerSheet).subscribe(data => {
      if (data.status === 'success') {
        this.toastservice.success('mark added', 'success')
      }
    })
  }

}
