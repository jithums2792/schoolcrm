import { Component, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { FacultyService } from 'src/app/services/faculty.service';
import { FileuploadService } from 'src/app/services/fileupload.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-studymaterial',
  templateUrl: './studymaterial.component.html',
  styleUrls: ['./studymaterial.component.css']
})
export class StudymaterialComponent implements OnInit {
  public classList = [];
  public sectionList = [];
  public sectionListUpload = [];
  public subjectList  = [];
  public selectedRoom;
  public selectedSection;
  public staffInfo;
  public mediaList = [];
  public photoList = [];
  public pdfList = [];
  public docList = [];
  public linkList = [];
  public saveFlag = true;
  public fileId;
  public uploadFlag = false;

  public studymaterial = {
    name: '',
    room: 'null',
    section: 'null',
    subject: 'null',
    teacher: '',
    type: 'null',
    note: '',
    content: null
  }
  constructor(private classservice: ClassesService,
    public sanitizer: DomSanitizer, 
    private fileuploaderservice: FileuploadService, 
    private facultyservice: FacultyService,
    private toastservice: ToastrService) { }

  ngOnInit() {
    this.getstaffinfo();
    this.getallClass()
  }


  async getstaffinfo() {
    this.facultyservice.getFacultyinfoByid(localStorage.getItem('teacher')).subscribe(data => {
      this.staffInfo = data.data
      this.studymaterial.teacher = data.data.firstname;
      this.subjectList = data.data.assignedSubject
    });
  }

  async getallClass() {
    this.classservice.getAllclass().subscribe(data => this.classList = data.data)
  }
  


  async classSelection(data) {
    if (data !== 'null') {
      this.selectedRoom = data;
      const room = this.classList.find(element => element.name === data);
      this.sectionList = room.section;
    }else {
      this.toastservice.warning('Select valid class', 'Warning')
    }
  }

  async sectionSelection(data) {
    if (data !== 'null') {
      this.selectedSection = data;
    } else {
      this.toastservice.warning('Select valid section', 'Warning')
    }
  }

  async uploadClassSelection() {
      const room = this.classList.find(element => element.name === this.studymaterial.room)
      this.sectionListUpload = room.section;
  }

  async uploader(event){

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = async () => {
      this.studymaterial.content = await reader.result;
      this.uploadFlag = true;
    }
  }

  async upload() {
    if (this.studymaterial.name !== '' && this.studymaterial.content !== null &&
        this.studymaterial.room !== 'null' && this.studymaterial.section !== 'null' &&
        this.studymaterial.subject !== 'null' && this.studymaterial.type !== 'null') {
          this.fileuploaderservice.addFile(this.studymaterial).subscribe(data => {
            if (data.status === 'success') {
              this.toastservice.success('media added', 'Success');
              this.studymaterial.content = null;
              this.studymaterial.name = '';
              this.studymaterial.note = '';
              this.studymaterial.room = 'null';
              this.studymaterial.section ='null';
              this.studymaterial.subject = 'null';
              this.studymaterial.teacher = this.staffInfo.firstname;
              this.studymaterial.type = 'null';
              this.studymaterial.content = null;
            } else {
              this.toastservice.error('something went wrong', 'Error')
            }
          })
        } else {
          this.toastservice.warning('Some field missing', 'Warning')
        }
    
  }

  async search() {
    this.photoList = [];
    this.pdfList = [];
    this.docList = [];
    this.fileuploaderservice.getAllfileByroomAndSection(this.selectedRoom, this.selectedSection).subscribe(data => {
      if (data.data.length > 0) {
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
        })
      } else {
        this.toastservice.warning('No File in that class and section', 'Warning')
      }
    })
  }

  async delete(data, index) {
    this.fileuploaderservice.deleteFilebyId(data._id).subscribe(data => {
      if (data.status === 'success') {
        if (data.data.type === 'image'){
            this.photoList.splice(index, 1);
        }
        if (data.data.type === 'pdf'){
          this.pdfList.splice(index, 1);
        }
        if (data.data.type === 'doc'){
          this.docList.splice(index, 1);
        }
        if (data.data.type === 'link'){
          this.linkList.splice(index, 1);
        }
        this.toastservice.success('media deleted', 'Success');
      } else {
        this.toastservice.success('something went wrong', 'Error')
      }
    })
  }

  async edit(data) {
    this.saveFlag = false;
    this.fileId = data._id;
    this.studymaterial.content = data.content;
        this.studymaterial.name = data.name;
        this.studymaterial.note = data.note;
        this.studymaterial.room = data.room;
        this.studymaterial.section =data.section;
        this.studymaterial.subject = data.subject;
        this.studymaterial.teacher = data.teacher;
        this.studymaterial.type = data.type;
  }

  async cancel() {
    this.saveFlag = true;
    this.studymaterial.content = null;
        this.studymaterial.name = '';
        this.studymaterial.note = '';
        this.studymaterial.room = '';
        this.studymaterial.section ='';
        this.studymaterial.subject = '';
        this.studymaterial.teacher = '';
        this.studymaterial.type = '';
  }

  async update() {
    this.fileuploaderservice.updateFile(this.fileId, this.studymaterial).subscribe(data => {
      if (data.data !== []) {
        this.toastservice.success('media updated', 'Success');
        this.cancel();
        this.saveFlag = true;
      } else {
        this.toastservice.success('something went wrong', 'Error')
      }
    })
  }
}
