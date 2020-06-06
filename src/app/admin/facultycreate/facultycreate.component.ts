import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacultyService } from 'src/app/services/faculty.service';
import { DesignationService } from 'src/app/services/designation.service';
import { DepartmentsService } from 'src/app/services/departments.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-facultycreate',
  templateUrl: './facultycreate.component.html',
  styleUrls: ['./facultycreate.component.css']
})
export class FacultycreateComponent implements OnInit {
  public facultyList = [];
  public facultyuid;
  public faculty = {
    id: '',
    firstname: '',
    lastname: '',
    fathername: '',
    mothername: '',
    email: '',
    designation: '',
    Department: '',
    gender: '',
    dob: '',
    doj: '',
    phone: '',
    phone2: '',
    maritialstatus: '',
    photo: null,
    currentaddress: '',
    permenentaddress: '',
    qualification: '',
    workexperiance: '',
    note: '',
    medicalleave:'',
    casualleave: '',
    maternityleave: '',
    username: 'teacher123',
    password: 'teacher@123',

  }
  public designationList = [];
  public departmentList = [];
  public saveFlag = true;

  constructor(private router: Router,
              private facultyservice: FacultyService,
              private designationservice: DesignationService,
              private departmentservice: DepartmentsService,
              private toastservice: ToastrService) { 
                try {
                  const editData = this.router.getCurrentNavigation().extras.state.data;
                  this.facultyuid = editData._id;
                  this.faculty.id = editData.staffid;
                  this.faculty.firstname = editData.firstname;
                  this.faculty.lastname = editData.lastname;
                  this.faculty.fathername = editData.fathername;
                  this.faculty.mothername = editData.mothername;
                  this.faculty.email = editData.email;
                  this.faculty.designation = editData.designation;
                  this.faculty.Department = editData.department;
                  this.faculty.gender = editData.gender;
                  this.faculty.dob = editData.dob;
                  this.faculty.doj = editData.doj;
                  this.faculty.phone = editData.phone;
                  this.faculty.phone2 = editData.phone2;
                  this.faculty.maritialstatus = editData.maritialstatus;
                  this.faculty.photo = editData.photo;
                  this.faculty.currentaddress = editData.currentaddress;
                  this.faculty.permenentaddress = editData.permenentaddress;
                  this.faculty.qualification = editData.qualification;
                  this.faculty.workexperiance = editData.workexperiance;
                  this.faculty.note = editData.note;
                  this.faculty.medicalleave = editData.medicalleave;
                  this.faculty.casualleave = editData.casualleave;
                  this.faculty.maternityleave = editData.maternityleave;
                  this.faculty.username = editData.userId;
                  this.faculty.password = editData.password;
                  this.saveFlag = false;
                } catch (error) {
                  console.log('working fine')
                }
              }

  ngOnInit() {
    this.getAllDepartments();
    this.getAllDesignation();
    this.getAllFaculty();
  }

  async getAllDepartments() {
    this.departmentservice.getDepartmentList().subscribe(async data => this.departmentList = data.data);
  }
  async getAllDesignation() {
    this.designationservice.getDesignationList().subscribe(data => this.designationList = data.data);
  }
  async getAllFaculty() {
    this.facultyservice.getAllstaff().subscribe(data => this.facultyList = data.data)
  }
  save() {
    if (this.faculty.id === '' || this.faculty.id === null || 
        this.faculty.designation === '' || this.faculty.designation === null ||
        this.faculty.firstname === '' || this.faculty.firstname === null ||
        this.faculty.lastname === '' || this.faculty.lastname === null ||
        this.faculty.Department === '' || this.faculty.Department === null ||
        this.faculty.email === '' || this.faculty.dob === '' ||
        this.faculty.doj === '' || this.faculty.phone === '') {
          this.toastservice.warning('some fields are missing', 'Warning')
        }
        else {
          console.log(this.faculty);
          this.facultyservice.addFaculty(this.faculty).subscribe(data => (data.status === "success")?this.toastservice.success('saved successfully', 'Success'):this.toastservice.error('error occured', 'Error'));
        }
    
  }

  async update() {
    if (this.faculty.id === '' || this.faculty.id === null || 
        this.faculty.designation === '' || this.faculty.designation === null ||
        this.faculty.firstname === '' || this.faculty.firstname === null ||
        this.faculty.lastname === '' || this.faculty.lastname === null ||
        this.faculty.Department === '' || this.faculty.Department === null ||
        this.faculty.email === '' || this.faculty.dob === '' ||
        this.faculty.doj === '' || this.faculty.phone === '') {
          this.toastservice.warning('some fields are missing', 'Warning')
        }
        else {
          console.log(this.faculty);
          this.facultyservice.updateFaculty(this.facultyuid,this.faculty).subscribe(data => (data.status === "success")?this.toastservice.success('saved successfully', 'Success'):this.toastservice.error('error occured', 'Error'));
        }
  }
  async uploader(event) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.faculty.photo = reader.result;
    }
  }
}
