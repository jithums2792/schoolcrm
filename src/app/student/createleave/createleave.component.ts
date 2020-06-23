import { Component, OnInit } from '@angular/core';
import { LeaveService } from 'src/app/services/leave.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createleave',
  templateUrl: './createleave.component.html',
  styleUrls: ['./createleave.component.css']
})
export class CreateleaveComponent implements OnInit {
  public saveFlag = true
  public leaveId
  public leaveForm = {
    room: localStorage.getItem('studentclass'),
    section: localStorage.getItem('studentsection'),
    name: localStorage.getItem('studentname'),
    reason: '',
    type: 'null',
    durationstart: '',
    durationend: '',
    status: 'pending',
    content: null
  }

  constructor(private leaveservice: LeaveService,
              private toastrservice: ToastrService,
              private router: Router) {
                try {
                  this.leaveForm.reason = router.getCurrentNavigation().extras.state.data.reason
                  this.leaveForm.type = router.getCurrentNavigation().extras.state.data.type
                  this.leaveForm.durationstart = router.getCurrentNavigation().extras.state.data.durationstart
                  this.leaveForm.durationend = router.getCurrentNavigation().extras.state.data.durationend
                  this.leaveForm.content = router.getCurrentNavigation().extras.state.data.content
                  this.leaveId = router.getCurrentNavigation().extras.state.data._id
                  this.saveFlag = false
                } catch (error) {
                  console.log('ahaa')
                }
               }

  ngOnInit() {
  }

  async fileuploader(data) {
    const reader = new FileReader()
    reader.onload = async() => {
      this.leaveForm.content = await reader.result
    }
    reader.readAsDataURL(data.target.files[0])
  }

  async addLeave() {
    if (this.leaveForm.type !== 'null' && this.leaveForm.reason !== '' && 
          this.leaveForm.durationstart !== '' && this.leaveForm.durationend !== '' ) {
            this.leaveservice.addleave(this.leaveForm).subscribe(data => {
              if (data.status === 'success') {
                this.toastrservice.success('Leave applied','Success')
                this.router.navigate(['/student/home/leavelist'])
              } else {
                this.toastrservice.error('Something wrong', 'Error')
              }
            })
      } else {
          this.toastrservice.warning('Some fields are missing', 'Warning')
    }
  }

  async validate() {
    if(this.leaveForm.type === 'null') {
      this.toastrservice.warning('please select valid leave type')
    }
  }
  async cancel() {
    this.leaveForm = {
      room: localStorage.getItem('studentclass'),
      section: localStorage.getItem('studentsection'),
      name: localStorage.getItem('studentname'),
      reason: '',
      type: 'null',
      durationstart: '',
      durationend: '',
      status: 'pending',
      content: null
    }
    this.router.navigate(['/student/home/leavelist'])
  }

  async update() {
    if (this.leaveForm.type !== 'null' && this.leaveForm.reason !== '' && 
          this.leaveForm.durationstart !== '' && this.leaveForm.durationend !== '' ) {
            this.leaveservice.updateleave(this.leaveId,this.leaveForm).subscribe(data => {
              if (data.status === 'success') {
                this.toastrservice.success('Leave updated','Success')
                this.router.navigate(['/student/home/leavelist'])
              } else {
                this.toastrservice.error('Something wrong', 'Error')
              }
            })
      } else {
          this.toastrservice.warning('Some fields are missing', 'Warning')
    }
  }

}
