import { Component, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private studentservice: StudentsService, private router: Router) { }

  ngOnInit() {
    this.getstudentinfo();
  }
  
  async getstudentinfo() {
    this.studentservice.getStudentbyid(localStorage.getItem('student')).subscribe(data => {
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

}
