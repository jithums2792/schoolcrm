import { Component, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';
import { ToastrService } from 'ngx-toastr';
import { FacultyService } from 'src/app/services/faculty.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.css']
})
export class HomeworkComponent implements OnInit {
  studentList
  assignedclassList
  assignedsectionList
  assignedsubjectList
  subject
  query = {
    class: 'null',
    section: 'null',
  }


  constructor(private studentservice: StudentsService,
              private staffservice: FacultyService,
              private router: Router,
              private toastrservice: ToastrService) { }

  ngOnInit() {
    this.getStaffinfo()
  }

  async getStaffinfo() {
    this.staffservice.getFacultyinfoByid(localStorage.getItem('teacher')).subscribe(data => {
      this.assignedclassList = data.data.assignedClass
      this.assignedsubjectList = data.data.assignedSubject
    })
  }

  async getAllstudents() {
    this.studentservice.getStudentsListByClass(this.query.class, this.query.section).subscribe(data => {
      if (data.data.length > 0) {
        this.studentList = data.data
      } else {
        this.toastrservice.warning('No students in that class', 'Warning')
      }
    })
  }

  async sectionSelection(room) {
    this.query.class = room.value
    const temp = await this.assignedclassList.find(element => element.room === room.value)
    this.assignedsectionList = temp.section
    console.log(this.assignedsectionList)
   
  }

  async search() {
    console.log(this.query)
    this.studentservice.getStudentsListByClass(this.query.class, this.query.section).subscribe(data => {
      if (data.data.length > 0) {
        this.studentList = data.data
      } else {
        this.toastrservice.warning('No students in that class', 'Warning')
      }
    })
  }

  async view(subject, index) {
    if (subject.value !== 'null') {
     let option: NavigationExtras = {
       state: {data: this.studentList[index], subname: subject.value}
     }
     this.router.navigate(['/teacher/home/view'], option)
    } else {
      this.toastrservice.warning('select a valid subject')
    }
  }
  

}
