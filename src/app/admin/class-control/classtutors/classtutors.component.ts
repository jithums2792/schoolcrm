import { Component, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { FacultyService } from 'src/app/services/faculty.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-classtutors',
  templateUrl: './classtutors.component.html',
  styleUrls: ['./classtutors.component.css']
})
export class ClasstutorsComponent implements OnInit {
  public classList = []
  public staffList = []
  public classId

  constructor(private classservice: ClassesService,
              private staffservice: FacultyService,
              private toastservice: ToastrService) { }

  ngOnInit() {
    this.getAllclassList()
    this.getAllstaffList()
  }
  getAllclassList() {
    this.classservice.getAllclass().subscribe(data => this.classList = data.data)
  }
  getAllstaffList() {
    this.staffservice.getAllstaff().subscribe(data => this.staffList = data.data)
  }
  staffSelection(data, classindex, sectionindex) {
    if (data.value !== 'null') {
      this.classList[classindex].classteacher[sectionindex] = data.value
      console.log(this.classList[classindex])
    } else {
      this.toastservice.warning('select a valid teacher', 'Warning')
    }
  }
  async save(data) {
    console.log(data)
    this.classId = await data._id
    this.classservice.updateClass(this.classId, data).subscribe(data => {
      if (data.status === 'success') {
        this.toastservice.success('Updated success', 'Success')
      } else {
        this.toastservice.error('something wrong', 'Error')
      }
    })
  }

}
