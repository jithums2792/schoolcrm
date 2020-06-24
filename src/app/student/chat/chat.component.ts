import { Component, OnInit } from '@angular/core';
import { FacultyService } from 'src/app/services/faculty.service';
import { ChatService } from 'src/app/services/chat.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  staffList: Array<any>
  msgList: Array<any>
  to = 'jithu ms'
  from = localStorage.getItem('studentname')
  chat = {
    from: localStorage.getItem('studentname'),
    to: this.to,
    msg: ''
  }
  query = {
    from: localStorage.getItem('studentname'),
    to: this.to,
  }

  constructor(private staffservice: FacultyService,
              private chatservice: ChatService,
              private toastrservice: ToastrService) { }

  ngOnInit() {
    this.getAllstaff()
    this.getAllchat()
  }

  async getAllstaff() {
    this.staffservice.getAllstaff().subscribe(data => {
      if (data.data.lenght <= 0) {
        this.toastrservice.warning('No avilable staff', 'Warning')
      } else if (data.status === 'success') {
        this.staffList = data.data
      } else {
        this.toastrservice.error('something wrong', 'Error')
      }
    })
  }

  async getAllchat() {
    this.chatservice.getchatbyCategory(this.query).subscribe(data => {
      console.log(data)
      if (data.status === 'success') {
        this.msgList = data.data
      }
    })
  }

  async send() {
    this.chatservice.addchat(this.chat).subscribe(data => {
      console.log(data)
      if (data.status === 'success') {
        this.chat.msg = ''
        this.getAllchat()
      }
    })
  }

  async selectStaff(staff) {
    this.query.to = staff.firstname + ' ' + staff.lastname
    this.chat.to = staff.firstname + ' ' + staff.lastname
    this.getAllchat()
  }



}
