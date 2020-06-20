import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AnswerService } from 'src/app/services/answer.service';

@Component({
  selector: 'app-attendexam',
  templateUrl: './attendexam.component.html',
  styleUrls: ['./attendexam.component.css']
})
export class AttendexamComponent implements OnInit {
  public exam
  public answersheet = []
  public sheet = {
    name: localStorage.getItem('studentname'),
    room: localStorage.getItem('studentclass'),
    section: localStorage.getItem('studentsection'),
    examname: '',
    subject: '',
    teacher: '',
    mark: null,
    correct: null,
    wrong: null,
    answersheet: []
  }

  constructor(private toastservice: ToastrService, 
              private router: Router,
              private answerservice: AnswerService) { 
    try {
      this.exam = router.getCurrentNavigation().extras.state.data
      this.sheet.examname = this.exam.name
      this.sheet.subject = this.exam.subject
      this.sheet.teacher = this.exam.teacher
      this.createAnswerFields(this.exam.questionlist)
    } catch (error) {
      router.navigate(['/student/home/exams'])
    }
  }

  ngOnInit() {
    let counter = false
    const exam = document.getElementById('exam')
    exam.requestFullscreen().catch(err => this.toastservice.error('Cant opend in fullwidth', 'Error'))
    exam.onfullscreenchange = () => {
      if (counter !== false) {
        this.toastservice.warning('you cant continue this exam', 'Warning')
        this.router.navigate(['/student/home/exams'])
      }
      else {
        counter = true
      }
    }
  }

  async createAnswerFields(list) {
    for (let item of list) {
      const field = Object({que: item.que, ans: null})
      this.answersheet.push(field)
    }
  }

  async finish() {
    this.sheet.answersheet = await this.answersheet
    this.answerservice.addanswer(this.sheet).subscribe(data => {
      if (data.status === 'success') {
        this.toastservice.success('Exam answers submited', 'Succes')
        this.router.navigate(['/student/home/exams'])
      } else {
        this.toastservice.error('something wrong', 'Error')
      }  
    })
  }


}
