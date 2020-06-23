import { Component, OnInit } from '@angular/core';
import { LeaveService } from 'src/app/services/leave.service';
import { Router, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-leavelist',
  templateUrl: './leavelist.component.html',
  styleUrls: ['./leavelist.component.css']
})
export class LeavelistComponent implements OnInit {
  public leaveList = []
  public query = {
    room: localStorage.getItem('studentclass'),
    section: localStorage.getItem('studentsection'),
    name: localStorage.getItem('studentname'),
  }

  constructor(private leaveservice: LeaveService,
              private router: Router,
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

  async deleteLeave(leave) {
    this.leaveservice.deleteleave(leave._id).subscribe(data => {
      if (data.status === 'success') {
        this.toastservice.success('Deleted succesfully', 'Success')
        this.getAllLeavelist()
      } else {
        this.toastservice.error('something wrong', 'Error')
      }
    })
  }

}
