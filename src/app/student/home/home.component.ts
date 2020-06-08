import { Component, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private studentservice: StudentsService) { }

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

}
