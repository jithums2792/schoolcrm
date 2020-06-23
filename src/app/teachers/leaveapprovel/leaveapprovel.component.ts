import { Component, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { LeaveService } from 'src/app/services/leave.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-leaveapprovel',
  templateUrl: './leaveapprovel.component.html',
  styleUrls: ['./leaveapprovel.component.css']
})
export class LeaveapprovelComponent implements OnInit {
  public classList = []
  public leaveList = []
  public query = {
    room: '',
    section: '',
    status: 'pending'
  }

  constructor(private classservice: ClassesService,
              private leaveservice: LeaveService,
              private toasterservice: ToastrService) { }

  ngOnInit() {
    this.getClasstutorInfo()
  }

  async getClasstutorInfo() {
    this.classservice.getAllclass().subscribe(async data => {
      this.classList =  await data.data
      this.filterData(this.classList)
    })
  }

  async filterData(data) {
    await data.find((element,i) =>{
      if (element.classteacher[i] === localStorage.getItem('teachername')) {
        this.query.room = element.name
        this.query.section = element.section[i]
      }
    })
    this.leaveservice.getAllleaveByQuery(this.query).subscribe(data => {
      if (data.data.length > 0) {
        this.leaveList = data.data
      } else {
        this.toasterservice.warning('No leave approvals')
      }
    })
  }

  async approve(leave) {
    leave.status = 'approved'
    this.leaveservice.updateleave(leave._id,leave).subscribe(data => {
      if (data.status === 'success') {
        this.toasterservice.success('Leave approved', 'Success')
      } else {
        this.toasterservice.error('Something wrong', 'Error')
      }
    })
  }

  async decline(leave) {
    leave.status = 'declined'
    this.leaveservice.updateleave(leave._id,leave).subscribe(data => {
      if (data.status === 'success') {
        this.toasterservice.warning('Leave declined', 'Warning')
      } else {
        this.toasterservice.error('Something wrong', 'Error')
      }
    })
  }

  async leaveSelection(data) {
    Object.assign(this.query, {status: data.value})
    this.leaveservice.getAllleaveByQuery(this.query).subscribe(data => this.leaveList = data.data)
  }

}
