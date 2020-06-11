import { Component, OnInit } from '@angular/core';
import { FileuploadService } from 'src/app/services/fileupload.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DepartmentsService } from 'src/app/services/departments.service';
import { StudentsService } from 'src/app/services/students.service';

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
  public uploadedFiles = [];
  public subject = 'null';

  constructor(private mediaservice: FileuploadService,
              public sanitizer: DomSanitizer,
              private subjectservice: DepartmentsService,
              private studentservice: StudentsService) { }

  ngOnInit() {
    this.getStudymaterial()
    this.getallSubjects()
    this.getstudentInfo()
  }
  getstudentInfo() {
    this.studentservice.getStudentbyid(localStorage.getItem('student')).subscribe(data => {this.studentInfo = data.data; console.log(this.studentInfo)})
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
    for(let file of filesx.target.files) {
      const reader = new FileReader();
      reader.onload = async() => {
        this.uploadedFiles.push(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  async upload() {
    let item = {
      subject: this.subject,
      media: this.uploadedFiles,
      date: new Date().getDate()+'-'+ new Date().getMonth()+'-'+ new Date().getFullYear()
    }
    await this.studentInfo.content.push(item)
    delete this.studentInfo._id;
    this.uploadedFiles = [];
    this.studentservice.updateStudent(localStorage.getItem('student'), this.studentInfo).subscribe(data => this.studentInfo = data.data)
  }

  async delete(index) {
    await this.studentInfo.content.splice(index, 1)
    delete this.studentInfo._id
    this.studentservice.updateStudent(localStorage.getItem('student'), this.studentInfo).subscribe(data => this.studentInfo = data.data)
  }
}
