import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facultycreate',
  templateUrl: './facultycreate.component.html',
  styleUrls: ['./facultycreate.component.css']
})
export class FacultycreateComponent implements OnInit {
  public faculty = {
    id: '',
    firstname: '',
    lastname: '',
    fathername: '',
    mothername: '',
    email: '',
    designation: 'All',
    Department: 'All',
    gender: 'Select',
    dob: '',
    doj: '',
    phone: '',
    phone2: '',
    maritialstatus: 'Select',
    photo: '',
    currentaddress: '',
    permenentaddress: '',
    qualification: '',
    workexperiance: '',
    note: '',
    medicalleave:'',
    casualleave: '',
    maternityleave: ''

  }
  public designationList = [
    {title: 'All'},
    {title: 'Teacher'},
    {title: 'HOD'},
    {title: 'Principale'}
  ]

  constructor(private router: Router) { }

  ngOnInit() {
  }

  save() {
    console.log(this.faculty);
  }
}
