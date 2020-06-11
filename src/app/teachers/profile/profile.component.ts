import { Component, OnInit } from '@angular/core';
import { FacultyService } from 'src/app/services/faculty.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public studentInfo;

  constructor(private staffservice: FacultyService) { }

  ngOnInit() {
    this.getStaffById();
  }

  async getStaffById() {
    this.staffservice.getFacultyinfoByid(localStorage.getItem('teacher')).subscribe(data => {
      this.studentInfo = data.data;
    })
  }

}
