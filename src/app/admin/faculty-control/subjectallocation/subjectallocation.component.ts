import { Component, OnInit } from '@angular/core';
import { FacultyService } from 'src/app/services/faculty.service';
import { DepartmentsService } from 'src/app/services/departments.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subjectallocation',
  templateUrl: './subjectallocation.component.html',
  styleUrls: ['./subjectallocation.component.css']
})
export class SubjectallocationComponent implements OnInit {
  public staffList = [];
  public subjectList = [];
  public staffId;

  constructor(private stafservice: FacultyService, private subjectservice: DepartmentsService, private toastservice: ToastrService) { }

  ngOnInit() {
    this.getAllFaculty();
    this.getAllSubjects();
  }

  async getAllFaculty() {
    this.stafservice.getAllstaff().subscribe(data => this.staffList = data.data);
  }

  async getAllSubjects() {
    this.subjectservice.getDepartmentList().subscribe(data => this.subjectList = data.data)
  }

  async subjectSelection(subject, index) {
    if (subject !== 'null') {
      const duplicate = this.staffList[index].assignedSubject.some(event => event === subject)
      if (duplicate === true) {
        this.toastservice.warning('Already in List', 'Warning')
      } else {
        this.staffList[index].assignedSubject.push(subject);
      }
    } else {
      this.toastservice.warning('select a valid subject', 'Warning');
    }
  }

  async delete(index, subindex) {
    this.staffList[index].assignedSubject.splice(subindex, 1);
  }

  async update(staff) {
    this.staffId = staff._id;
    delete staff._id
    this.stafservice.updateFaculty(this.staffId, staff).subscribe(data => {
      if(data.data !== []) {
        this.toastservice.success('updated successfully','Success')
      } else {
        this.toastservice.error('something wrong', 'Error')
      }
    })
  }
}
