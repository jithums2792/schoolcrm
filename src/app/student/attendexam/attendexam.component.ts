import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendexam',
  templateUrl: './attendexam.component.html',
  styleUrls: ['./attendexam.component.css']
})
export class AttendexamComponent implements OnInit {
  public exam
  public answersheet = []

  constructor(private toastservice: ToastrService, private router: Router) { 
    try {
      this.exam = router.getCurrentNavigation().extras.state.data
      this,this.createAnswerFields(this.exam.questionlist)
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
    console.log(this.answersheet)
  }

  async finish() {
    console.log(this.answersheet)
  }


}
