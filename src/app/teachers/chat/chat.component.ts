import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import * as _ from 'lodash'
import * as io from 'socket.io-client'
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public togleFlag = true
  public studentList = []
  public msgList = []
  public from = localStorage.getItem('teachername')
  public socket
  public socket_api = environment.socket
  public sendQuery = {
    from: this.from,
    to: '',
  }
  public receiveQuery = {
    from: '',
    to: this.from
  }
  public studentQuery = {
    to: this.from
  }
  public chat = {
    from: this.from,
    to: '',
    msg: ''
  }

  constructor(private chatservice: ChatService) { }

  ngOnInit() {
    
    this.socket = io(this.socket_api + '/chat')
    this.getStudentList()
    this.socket.emit('join', {room: 'chatroom'})
    this.socket.on('join', data => console.log(data))
    this.socket.on('msg', data => this.getallchats())
  }

  async getStudentList() {
    let tempArray = []
    this.chatservice.getchatbyCategory(this.studentQuery).subscribe(async data => {
      if (data.status === 'success') {
          await data.data.forEach(element => {
            tempArray.push(element.from)
          });
          this.studentList =await [...new Set(tempArray)]
      }
    })
  }

  async getallchats() {
    await this.chatservice.getchatbyCategory(this.sendQuery).subscribe(data => {
      if(data.status === 'success') {
        this.combain(data.data)
      }
    }) 
    await this.chatservice.getchatbyCategory(this.receiveQuery).subscribe(data => {
      console.log(data)
      if(data.status === 'success') {
        this.combain(data.data)
      }
    })
  }

  async combain(data) {
    this.msgList = await this.msgList.concat(data)
    this.msgList.sort((a,b) => +new Date(a.date) - +new Date(b.date))
    console.log(this.msgList)
  }

  async selectStudentf(student) {
    this.togle()
    this.msgList = []
    this.chat.to = await student
    this.sendQuery.to = await student
    this.receiveQuery.from = await student
    console.log(this.receiveQuery)
    this.getallchats()
  }

  async togle() {
    try {
    const msgBody = document.getElementById('msgBody')
    console.log(msgBody.scrollHeight)
    } catch (error) {
      console.log(error)
    }
    this.togleFlag = ! this.togleFlag
  }

  async send() {
    this.socket.emit('msg', {room: 'chatroom'})
    this.msgList = []
    this.chatservice.addchat(this.chat).subscribe(data => {
      if (data.status === 'success') {
        this.chat.msg = ''
        this.getallchats()
      }
    })
  }

}
