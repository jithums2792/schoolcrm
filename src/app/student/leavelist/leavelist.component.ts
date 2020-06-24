import { Component, OnInit, TemplateRef  } from '@angular/core';
import { LeaveService } from 'src/app/services/leave.service';
import { Router, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-leavelist',
  templateUrl: './leavelist.component.html',
  styleUrls: ['./leavelist.component.css']
})
export class LeavelistComponent implements OnInit {
  modalRef: BsModalRef;
  leave
  public leaveList = []
  public query = {
    room: localStorage.getItem('studentclass'),
    section: localStorage.getItem('studentsection'),
    name: localStorage.getItem('studentname'),
  }

  constructor(private leaveservice: LeaveService,
              private router: Router,
              private modalService: BsModalService,
              private toastservice: ToastrService) { }

  ngOnInit() {
    this.getAllLeavelist()
  }

  async getAllLeavelist() {
    this.leaveservice.getAllleaveByQuery(this.query).subscribe(data => {
      this.leaveList = data.data
    })
  }

  async editLeave(leave) {
    const options: NavigationExtras = {
      state: {data: leave}
    }
    this.router.navigate(['/student/home/createleave'], options)
  }

  openModal(template: TemplateRef<any>, leave) {
    this.leave = leave
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  async deleteLeave() {
    this.leaveservice.deleteleave(this.leave._id).subscribe(data => {
      if (data.status === 'success') {
        this.toastservice.success('Deleted succesfully', 'Success')
        this.modalRef.hide();
        this.getAllLeavelist()
      } else {
        this.toastservice.error('something wrong', 'Error')
      }
    })
  }

  decline(): void {
    this.modalRef.hide();
  }

}
