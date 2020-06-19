import { Component, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';
import { Router, NavigationExtras } from '@angular/router';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public username

  constructor(private studentservice: StudentsService, private router: Router, private examservice: ExamService) { }

  ngOnInit() {
    this.getstudentinfo();
  }
  
  async getstudentinfo() {
    this.studentservice.getStudentbyid(localStorage.getItem('student')).subscribe(data => {
      this.username = data.data.name
      localStorage.setItem('studentname', data.data.name);
      localStorage.setItem('studentclass', data.data.class);
      localStorage.setItem('studentsection', data.data.section)
    })
  }

  async logout() {
    localStorage.removeItem('student');
    localStorage.removeItem('studentname');
    localStorage.removeItem('studentclass');
    localStorage.removeItem('studentsection');
    this.router.navigate(['/home']);
  }

  async navigate(){
    const exam = await this.examservice.getexam();
    const option: NavigationExtras = {
      state: {data: exam}
    };
    this.router.navigate(['/student/home/attendexam'],option)
  }

}
