import { Component, OnInit, TemplateRef  } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NoticeboardService } from 'src/app/services/noticeboard.service';
import { ClassesService } from 'src/app/services/classes.service';
import { data } from 'jquery';
import { template } from 'lodash';

@Component({
  selector: 'app-noticeboardcontrol',
  templateUrl: './noticeboardcontrol.component.html',
  styleUrls: ['./noticeboardcontrol.component.css']
})
export class NoticeboardcontrolComponent implements OnInit {
  modalRef: BsModalRef;
  saveFlag = true
  noticeList = []
  classList = []
  sectionList = []
  selectedNotice
  query = {
    room: 'null',
    section: 'null',
    type: 'null'
  }
  notice = {
    title: '',
    note: '',
    room: 'null',
    section: 'null',
    image: null,
    type: 'null'
  }

  constructor(private modalService: BsModalService,
              private toastrservice: ToastrService,
              private classservice: ClassesService,
              private noticeservice: NoticeboardService) { }

  ngOnInit() {
    this.getallNoticeboard()
    this.getAllclass()
  }
  
  async getAllclass() {
    this.classservice.getAllclass().subscribe(data => {
      this.classList = data.data
    })
  }

  async getallNoticeboard() {
    this.noticeservice.getAllnoticeboard().subscribe(data => {
      this.noticeList = data.data
    })
  }

  async sectionSelection(data) {
    if (data !== 'null') {
      if (data === 'All') {
        this.sectionList = []
      } else {
        const temp = this.classList.find(element => element.name === data)
        this.sectionList = temp.section
      }
    } else {
      this.toastrservice.warning('Select a class', 'Warning')
    }
  }

  async search() {
    this.noticeservice.getAllnoticeboardByQuery(this.query).subscribe(data => {
      if (data.data.length > 0 ) {
        this.noticeList = data.data
      } else {
        this.toastrservice.warning('No notice found', 'Warning')
      }
    })
  }

  async save() {
    if (this.notice.title !== '' && this.notice.note !== '' && this.notice.room !== 'null' && this.notice.section !== 'null' && this.notice.type !== 'null') {
        this.noticeservice.addnoticeboard(this.notice).subscribe(data => {
        if (data.status === 'success') {
          this.toastrservice.success('Notice added', 'Success')
          this.modalRef.hide()
          this.getallNoticeboard()
        } else {
          this.toastrservice.error('something wrong', 'Error')
        }
      })
    } else {
      this.toastrservice.warning('some fields are missing', 'Warning')
    }
  }

  async edit(notice, template: TemplateRef<any>) {
    this.notice = notice
    this.saveFlag = false
    this.modalRef = this.modalService.show(template);
  }

  async delete(notice, template: TemplateRef<any>) {
    this.selectedNotice = notice
    this.modalRef = this.modalService.show(template);
  }

  async confirm() {
    this.noticeservice.deletenoticeboard(this.selectedNotice._id).subscribe(data => {
      if (data.status === 'success') {
        this.toastrservice.success('Deleted successfully', 'Success')
        this.getallNoticeboard()
        this.modalRef.hide()
      } else {
        this.toastrservice.error('Something wrong', 'Error')
      }
    })
  }

  async decline() {
    this.modalRef.hide()
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  async fileupload(event) {
    const reader = new FileReader()
    reader.onload = () => this.notice.image = reader.result
    reader.readAsDataURL(event.target.files[0])
  }

}
