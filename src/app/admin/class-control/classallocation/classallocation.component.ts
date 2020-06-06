import { Component, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { FacultyService } from 'src/app/services/faculty.service';

@Component({
  selector: 'app-classallocation',
  templateUrl: './classallocation.component.html',
  styleUrls: ['./classallocation.component.css']
})
export class ClassallocationComponent implements OnInit {
  public classList = [];
  public staffList = [];

  constructor(private classservice: ClassesService, private facultyservice: FacultyService) { }

  ngOnInit() {
    this.getAllclass();
    this.getAllfaculty();
  }

  async getAllclass() {
    this.classservice.getAllclass().subscribe(data => this.classList = data.data)
  }
  async getAllfaculty() {
    this.facultyservice.getAllstaff().subscribe(data => this.staffList = data.data)
  }

}
