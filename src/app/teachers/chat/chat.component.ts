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
  @ViewChild('msgBody', {static: true}) msgbody: ElementRef
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

  ngAfterViewInit() {
    console.log(this.msgbody)
  }

  async ngOnInit() {
    this.socket = io(this.socket_api)
    this.getStudentList()
    this.socket.emit('chat', {room: 'chatroom'})
    this.socket.on('chat', data => console.log(data))
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
    this.msgList = []
    await this.chatservice.getchatbyCategory(this.sendQuery).subscribe(data => {
      if(data.status === 'success') {
        this.combain(data.data)
      }
    }) 
    await this.chatservice.getchatbyCategory(this.receiveQuery).subscribe(data => {
      if(data.status === 'success') {
        this.combain(data.data)
      }
    })
  }

  async combain(data) {
    this.msgList = await this.msgList.concat(data)
    this.msgList.sort((a,b) => +new Date(a.date) - +new Date(b.date))
  }

  async selectStudentf(student) {
    this.togle()
    this.msgList = []
    this.chat.to = await student
    this.sendQuery.to = await student
    this.receiveQuery.from = await student
    this.getallchats()
  }

  async togle() {
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
