import { Component, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { StudentsService } from 'src/app/services/students.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studentadmision',
  templateUrl: './studentadmision.component.html',
  styleUrls: ['./studentadmision.component.css']
})
export class StudentadmisionComponent implements OnInit {
  public studentId;
  public student = {
    admissionnumber: '',
    admissiondate: '',
    name: '',
    dob: '',
    class: 'null',
    section: 'null',
    gender: '',
    category: '',
    relegion: '',
    cast: '',
    phone: '',
    emergencynumber: '',
    presentaddress: '',
    permanentaddress: '',
    email: '',
    adhaar: '',
    bloodgroup: '',
    fathername: '',
    mothername: '',
    guardianname: '',
    fathersoccupation: '',
    mothersoccupation: '',
    guardiansoccupation: '',
    fathersmail: '',
    mothersmail: '',
    guardiansmail: '',
    guardiancontact: '',
    mothercontact: '',
    fathercontact: '',
    parentaddress: '',
    guardianaddress: '',
    previousinstitution: '',
    busboardingpoint: '',
    username: '',
    password: '',
    photo: null
  }
  public saveFlag = true;
  public genderList = ['Male', 'Female'];
  public categoryList = ['General', 'SC', 'ST', 'OBC', 'OBC', 'Speacial', 'Other backwards'];
  public religionList = ['Hindhu', 'Christian', 'Islam', 'Budh', 'Jain', 'Nill'];
  public bloodList = ['A', 'A+', 'A-', 'B','B+', 'B-','O', 'O+', 'O-', 'AB+', 'AB-'];
  public classList = [];
  public sectionList = []
  public selectedClass = '1';

  constructor(private classservice: ClassesService, private studentservice: StudentsService, private toastservice: ToastrService, private router: Router) { 
    try {
      const editData = this.router.getCurrentNavigation().extras.state.data;
      this.studentId = editData._id;
        this.student.admissionnumber = editData.admissionnumber;
        this.student.admissiondate = editData.admissiondate;
        this.student.name = editData.name;
        this.student.dob = editData.dob;
        this.student.class = editData.class;
        this.student.section = editData.section;
        this.student.gender = editData.gender;
        this.student.category = editData.category;
        this.student.relegion = editData.relegion;
        this.student.cast = editData.cast;
        this.student.phone = editData.phone;
        this.student.emergencynumber = editData.emergencynumber;
        this.student.presentaddress = editData.presentaddress;
        this.student.permanentaddress = editData.permanentaddress;
        this.student.fathername = editData.fathername;
        this.student.mothername = editData.mothername;
        this.student.guardianname = editData.guardianname
        this.student.fathersoccupation = editData.fathersoccupation;
        this.student.mothersoccupation = editData.mothersoccupation;
        this.student.guardiansoccupation = editData.guardiansoccupation;
        this.student.fathersmail = editData.fathersmail;
        this.student.mothersmail = editData.mothersmail;
        this.student.guardiansmail = editData.guardiansmail;
        this.student.guardiancontact = editData.guardiancontact;
        this.student.mothercontact = editData.mothercontact;
        this.student.fathercontact = editData.fathercontact;
        this.student.parentaddress = editData.parentaddress;
        this.student.guardianaddress = editData.guardianaddress;
        this.student.previousinstitution = editData.previousinstitution;
        this.student.busboardingpoint = editData.busboardingpoint;
        this.student.username = editData.username;
        this.student.password = editData.password;
        this.student.photo = editData.photo;
        this.saveFlag = false;
    } catch (error) {
      console.log('gpong fine')
    }
  }

  ngOnInit() {
    this.getAllclass();
  }

  async getAllclass() {
    this.classservice.getAllclass().subscribe(data => this.classList = data.data);
  }

  async sectionFilter() {
    if(this.student.class !== 'null') {
      const sections = this.classList.find(element => element.name === this.student.class);
      this.sectionList = sections.section;
    } else {
      this.toastservice.warning('select a valid option')
    }
  }

  async save() {
    this.studentservice.addStudent(this.student).subscribe(data => {
      if (data.status === 'success') {
        this.toastservice.success('Student admission success', 'Success');
      } else {
        this.toastservice.error('something wrong', 'Error')
      }
    })
    
  }

  async update() {
    this.studentservice.updateStudent(this.studentId,this.student).subscribe(data => {
      if (data.status === 'success') {
        this.toastservice.success('updated successfully', 'Success');
      } else {
        this.toastservice.error('something went wrong', 'Error')
      }
    })
  }

  async uploder(event) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.student.photo = reader.result;
    }

  }

}
