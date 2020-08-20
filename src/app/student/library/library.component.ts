import { Component, OnInit } from '@angular/core';
import { MediauploadService } from 'src/app/services/mediaupload.service';
import { DepartmentsService } from 'src/app/services/departments.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  public mediaList = []
  public subjectList = []
  public url = null
  public query = {
    query: {
      class: localStorage.getItem('studentclass'),
      section: localStorage.getItem('studentsection'),
      subject: 'null',
    },
    limit: 10,
    skip: 0
  }

  constructor(private mediaservice: MediauploadService,
              private toastservice: ToastrService,
              private subectservice: DepartmentsService) { }

  ngOnInit() {
    this.getalldepartment()
  }

  getalldepartment() {
    this.subectservice.getDepartmentList().subscribe(data => this.subjectList = data.data)
  }

  getallmedia() {
    if (this.query.query.class !== 'null') {
        this.mediaservice.getmediabyquery(this.query).subscribe(data => {
        if(data.status === 'success' && data.data.length > 0) {
          this.mediaList = data.data
        } else if(data.status === 'success' && data.data.length === 0) {
          this.toastservice.warning('no media in this subect')
        } else {
          this.toastservice.error(data.data.message)
        }
      })
    } else {
      this.toastservice.warning('select a valid subject')
    }
  }
  async setUrl(url) {
    this.url = url
  }

}
