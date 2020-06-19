import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentsService } from 'src/app/services/students.service';
import { FacultyService } from 'src/app/services/faculty.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  public tile = 1;
  public login = false;
  public username;
  public password;

  constructor(private router: Router, private studentservice: StudentsService, private facultyservice: FacultyService) { }

  ngOnInit() {
  }

  studentlogin() {
    const data = {
      username: this.username,
      password: this.password
    }
    this.studentservice.login(data).subscribe(data => {
      if (data.data.length >= 1) {
        localStorage.setItem('student', data.data[0]._id);
        localStorage.setItem('studentname',data.data[0].firstname)
        this.router.navigate(['/student']);
      }
    });
  }
  teacherlogin() {
    const data = {
      username: this.username,
      password: this.password
    };
    this.facultyservice.login(data).subscribe(data => {
      if (data.data.length >= 1) {
        localStorage.setItem('teacher', data.data[0]._id);
        localStorage.setItem('teachername',data.data[0].firstname)
        this.router.navigate(['/teacher']);
      }
      
    })
  }

}
