import { Component, OnInit } from '@angular/core';
import { FacultyService } from 'src/app/services/faculty.service';
import { ChatService } from 'src/app/services/chat.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash'

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
  sendquery = {
    from: localStorage.getItem('studentname'),
    to: this.to,
  }
  receivequery = {
    to: localStorage.getItem('studentname'),
    from: this.to,
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
    let sendList
    let receiveList
    await this.chatservice.getchatbyCategory(this.sendquery).subscribe(data => {
      if (data.status === 'success') {
        sendList = data.data
      }
    })
    await this.chatservice.getchatbyCategory(this.receivequery).subscribe(data => {
      if (data.status === 'success') {
        receiveList = data.data
      }
    })

    let tempMsg = _.concat(sendList,receiveList)
    console.log(tempMsg)
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
    this.sendquery.to = staff.firstname + ' ' + staff.lastname
    this.receivequery.from = staff.firstname + ' ' + staff.lastname
    this.chat.to = staff.firstname + ' ' + staff.lastname
    this.getAllchat()
  }



}
