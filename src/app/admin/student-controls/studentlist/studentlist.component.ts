import { Component, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { StudentsService } from 'src/app/services/students.service';
import { Router, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css']
})
export class StudentlistComponent implements OnInit {
  public classList = [];
  public selectedClass = 'null';
  public selectedSection = 'null';
  public sectionList = [];
  public studentList = [];
  public studentId;

  constructor(private classservice: ClassesService,private toastservice: ToastrService, private studentservice: StudentsService, private router: Router) { }

  ngOnInit() {
    this.getAllclass();
  }

  async getAllclass() {
    this.classservice.getAllclass().subscribe(data => this.classList = data.data);
  }
  
  async classSelect() {
    const selectionclass = this.classList.find( element => element.name === this.selectedClass);
    this.sectionList = selectionclass.section;
  }

  async search() {
    this.studentservice.getStudentsListByClass(this.selectedClass, this.selectedSection).subscribe(data => {
      this.studentList = data.data;
      console.log(this.studentList);
    })
  }

  async edit(student) {
    const extras: NavigationExtras = {
      state: {data: student}
    };
    this.router.navigate(['admision'], extras);

  }

  async delete() {
    console.log(this.studentId);
    this.studentservice.deleteStudent(this.studentId).subscribe(data => {
      if (data.status === 'success') {
        this.toastservice.success('deleted successfully','Success');
      } else {
        this.toastservice.error('something went wrong', 'Error')
      }
    })
  }
}
