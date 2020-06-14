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

  constructor(private toastservice: ToastrService, private router: Router) { 
    try {
      this.exam = router.getCurrentNavigation().extras.state.data
    } catch (error) {
      router.navigate(['/student/home/exams'])
    }
  }

  ngOnInit() {
    const exam = document.getElementById('exam')
    console.log(exam)
    exam.requestFullscreen().catch(err => this.toastservice.error('Cant opend in fullwidth', 'Error'))
  }

  

}
