import { Component, OnInit } from '@angular/core';
import { FileuploadService } from 'src/app/services/fileupload.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DepartmentsService } from 'src/app/services/departments.service';
import { StudentsService } from 'src/app/services/students.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-studymaterial',
  templateUrl: './studymaterial.component.html',
  styleUrls: ['./studymaterial.component.css']
})
export class StudymaterialComponent implements OnInit {
  public photoList = [];
  public pdfList = [];
  public docList = [];
  public linkList = [];
  public mediaList = [];
  public subjectList = [];
  public studentInfo;
  public uploadedFiles = []
  public subject = 'null';
  public name = '';
  public note ='';
  public type = 'null';
  public content = null
  public saveFlag = true;

  constructor(private mediaservice: FileuploadService,
              public sanitizer: DomSanitizer,
              private toastrservice: ToastrService,
              private subjectservice: DepartmentsService,
              private studentservice: StudentsService) { }

  ngOnInit() {
    this.getStudymaterial()
    this.getallSubjects()
    this.getstudentInfo()
  }
  getstudentInfo() {
    this.studentservice.getStudentbyid(localStorage.getItem('student')).subscribe(data => {this.studentInfo = data.data;
        console.log(data.data)
        this.uploadedFiles = data.data.content
        console.log(this.uploadedFiles)
      })
  }
  getStudymaterial() {
    this.photoList = [];
    this.pdfList = [];
    this.docList = [];
    this.mediaservice.getAllfileByroomAndSection(localStorage.getItem('studentclass'),localStorage.getItem('studentsection')).subscribe(data =>{
      this.mediaList = data.data;
      this.mediaList.forEach(element => {
        if (element.type === 'image') {
          this.photoList.push(element);
        }
        if (element.type === 'doc') {
          this.docList.push(element);
        }
        if (element.type === 'pdf') {
          this.pdfList.push(element)
        }
        if (element.type === 'link') {
          this.linkList.push(element)
        }
      });
    }) 

  }

  async getallSubjects() {
    this.subjectservice.getDepartmentList().subscribe(data => this.subjectList = data.data)
  }

  async studentfileUploader(filesx){
    const reader = new FileReader()
    reader.onload = () => {
      this.content = reader.result
    }
    reader.readAsDataURL(filesx.target.files[0])
  }

  async upload() {
    if (this.name !== '' && this.type !== 'null'  && this.subject !== 'null') {
          let item = {
            subject: this.subject,
            note: this.note,
            name: this.name,
            type: this.type,
            media: this.content,
            date: new Date().getDate()+'-'+ new Date().getMonth()+'-'+ new Date().getFullYear()
          }
          this.studentInfo.content.push(item)
          delete this.studentInfo._id;
          this.studentservice.updateStudent(localStorage.getItem('student'), this.studentInfo).subscribe(data => {
            this.uploadedFiles = data.data.content;
            this.name = ''
            this.type = 'null'
            this.subject = 'null'
            this.note = ''
            this.content = null
          })
        } else {
          this.toastrservice.warning('Some field missing', 'Warning')
        }
  }

  async delete(index) {
    await this.studentInfo.content.splice(index, 1)
    delete this.studentInfo._id
    console.log(this.studentInfo)
    this.studentservice.updateStudent(localStorage.getItem('student'), this.studentInfo).subscribe(data => this.uploadedFiles = data.data.content)
  }
}
