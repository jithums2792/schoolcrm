import { Component, OnInit, TemplateRef } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';
import { ToastrService } from 'ngx-toastr';
import { DepartmentsService } from 'src/app/services/departments.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.css']
})
export class HomeworkComponent implements OnInit {
  loader = false
  modalRef: BsModalRef;
  public saveFlag = true;
  public name = '';
  public note ='';
  public type = 'image';
  public content = null
  public subject = 'null';
  public studentInfo;
  public uploadedFiles = []
  public subjectList = [];
  public fileIndex

  constructor(private studentservice: StudentsService,
              private toastrservice: ToastrService,
              private modalService: BsModalService,
              private subjectservice: DepartmentsService) { }

  ngOnInit() {
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
      this.loader =true
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
            this.loader = false
            this.uploadedFiles = data.data.content;
            this.name = ''
            this.type = 'image'
            this.subject = 'null'
            this.note = ''
            this.content = null
          })
        } else {
          this.toastrservice.warning('Some field missing', 'Warning')
        }
  }

  openModal(template: TemplateRef<any>, index) {
    this.fileIndex = index
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  async delete() {
    await this.studentInfo.content.splice(this.fileIndex, 1)
    delete this.studentInfo._id
    console.log(this.studentInfo)
    this.studentservice.updateStudent(localStorage.getItem('student'), this.studentInfo).subscribe(data => this.uploadedFiles = data.data.content)
    this.modalRef.hide();
  }

  async decline() {
    this.modalRef.hide();
  }

}
