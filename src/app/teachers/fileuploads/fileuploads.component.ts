import { Component, OnInit, TemplateRef  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MediauploadService } from 'src/app/services/mediaupload.service';
import { FacultyService } from 'src/app/services/faculty.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fileuploads',
  templateUrl: './fileuploads.component.html',
  styleUrls: ['./fileuploads.component.css']
})
export class FileuploadsComponent implements OnInit {
  modalRef: BsModalRef;
  public upload = new FormGroup({
    class: new FormControl('null', Validators.required),
    section: new FormControl('null', Validators.required),
    subject: new FormControl('null', Validators.required),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image:  new FormControl(null, Validators.required),
  })
  public query = {
    query: {
      class: 'null',
      section: 'null',
      subject: 'null',
    },
    limit: 10,
    skip: 0
  }
  public formData = new FormData()
  public classList = []
  public sectionList = []
  public subjectList = []
  public classList2 = []
  public sectionList2 = []
  public subjectList2 = []
  public mediaList = []
  public mediaUrl

  constructor(private mediaservice: MediauploadService,
              private toastservice: ToastrService,
              private modalService: BsModalService,
              private staffservice: FacultyService) { }

  ngOnInit() {
    this.getStaff()
  }

  getStaff() {
    this.staffservice.getFacultyinfoByid(localStorage.getItem('teacher')).subscribe(data => {
      console.log(data)
      this.classList = data.data.assignedClass
      this.subjectList = data.data.assignedSubject
      this.classList2 = data.data.assignedClass
      this.subjectList2 = data.data.assignedSubject
    })
  }

  async fileupload(event) {
    this.formData.append('media', event.target.files[0])
  }

  async imageupload(event) {
    const reader = new FileReader()
    reader.onload = () => this.upload.patchValue({image: reader.result})
    reader.readAsDataURL(event.target.files[0])
  }

  async sectionControl() {
    if(this.upload.value.class !== 'null') {
      const temp = this.classList.find(item => item.room === this.upload.value.class)
      this.sectionList = temp.section
    } else {
      this.sectionList = []
      this.toastservice.warning('select valid option')
    }
  }
  async sectionControl2() {
    if(this.query.query.class !== 'null') {
      const temp = this.classList2.find(item => item.room === this.query.query.class)
      this.sectionList2 = temp.section
    } else {
      this.sectionList2 = []
      this.toastservice.warning('select valid option')
    }
  }

  async search() {
    if(this.query.query.class !== 'null' && this.query.query.section !== 'null' && this.query.query.subject !== 'null') {
      this.mediaservice.getmediabyquery(this.query).subscribe(async data => { 
        console.log(data)
        if (data.status === 'success' && data.data.length > 0) {
          this.mediaList = data.data
        } else if(data.status === 'error'){
          this.toastservice.error(data.data.message)
        }
        else if(data.data.length === 0){
          this.toastservice.warning('no data for this search')
          this.mediaList = []
        }
      })
    } else {
      this.toastservice.warning('some fields are missing')
    }
  }

  async save() {
    if (this.upload.valid) {
      this.formData.append('data', JSON.stringify(this.upload.value))
      this.mediaservice.addmedia(this.formData).subscribe(data => {
        if(data.status === 'success') {
          this.toastservice.success('media added')
          this.upload.reset({
            class: 'null',
            section: 'null',
            subject: 'null',
            title: '',
            description: '',
            image:  null,
          })
          this.formData = new FormData()
        } else {
          this.toastservice.error(data.data.message)
        }
      })
    } else {
      this.toastservice.warning('some fields are missing')
    }
  }

  openModal(template: TemplateRef<any>,url) {
    this.mediaUrl = url
    this.modalRef = this.modalService.show(template,
      { class: 'modal-lg modal-dialog-centered',
        ignoreBackdropClick: true, 
        keyboard: false
      });
  }

  async delete(id) {
    this.mediaservice.deletemedia(id).subscribe(data => {
      console.log(data)
      if(data.status === 'success') {
        this.toastservice.success('Media Removed')
        this.search()
      } else {
        this.toastservice.error(data.data.message)
      }
    })
  }

}
