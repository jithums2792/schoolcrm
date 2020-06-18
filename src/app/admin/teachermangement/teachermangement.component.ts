import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DesignationService } from 'src/app/services/designation.service';
import { FacultyService } from 'src/app/services/faculty.service';

@Component({
  selector: 'app-teachermangement',
  templateUrl: './teachermangement.component.html',
  styleUrls: ['./teachermangement.component.css']
})
export class TeachermangementComponent implements OnInit {
  public facultyList = [];
  public allFaculty = [];
  public designationList = [];
  public designation;
  
  constructor(private router: Router, private desigantiondervice: DesignationService, private facultyservice: FacultyService) { }

  ngOnInit() {
    this.getAllfaculty();
    this.getAllDesignation();
  }
  async getAllDesignation() {
    this.desigantiondervice.getDesignationList().subscribe(data => this.designationList = data.data);
  }
  async getAllfaculty() {
    this.facultyservice.getAllstaff().subscribe(data => {
      this.facultyList = data.data;
      this.allFaculty = data.data;
    });
  }


  async designationfilter() {
    if (this.designation === 'All') {
      this.facultyList = this.allFaculty;
    } else {
      const newList = this.allFaculty.filter( (element) => element.designation === this.designation);
      this.facultyList = newList;
    }
  }

  async edit(faculty) {
    const extras: NavigationExtras = {
      state: {data: faculty}
    };
    this.router.navigate(['/sadmin/createfaculty'], extras);
  }

}
