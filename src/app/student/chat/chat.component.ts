import { Component, OnInit } from '@angular/core';
import { FacultyService } from 'src/app/services/faculty.service';
import { ChatService } from 'src/app/services/chat.service';
import { ToastrService } from 'ngx-toastr';
import * as io from 'socket.io-client'
import * as _ from 'lodash'
import { environment } from 'src/environments/environment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  staffList: Array<any>
  msgList: Array<any>
  socket_api = environment.socket
  socket
  togleFlag = true
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

    this.socket = io(this.socket_api)
    this.socket.emit('chat', {room: 'chatroom'})
    this.socket.on('chat', data => console.log(data))
    this.socket.on('msg', data => this.getAllchat())
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
    this.chatservice.getchatbyCategory(this.sendquery).subscribe(data => {
      if (data.status === 'success') {
        sendList = data.data
      }
      this.chatservice.getchatbyCategory(this.receivequery).subscribe(data => {
        if (data.status === 'success') {
          receiveList = data.data
          this.msgList = _.concat(sendList,receiveList)
          this.msgList.sort((a,b) => +new Date(a.date) - +new Date(b.date))
        }
      })
    })
  }

  async send() {
    this.socket.emit('msg', {room: 'chatroom'})
    this.chatservice.addchat(this.chat).subscribe(data => {
      if (data.status === 'success') {
        this.chat.msg = ''
        this.getAllchat()
      }
    })
  }

  async selectStaff(staff) {
    this.togleFlag = !this.togleFlag
    this.sendquery.to = staff.firstname + ' ' + staff.lastname
    this.receivequery.from = staff.firstname + ' ' + staff.lastname
    this.chat.to = staff.firstname + ' ' + staff.lastname
    this.getAllchat()
  }

  async togle() {
    this.togleFlag = ! this.togleFlag
  }



}
