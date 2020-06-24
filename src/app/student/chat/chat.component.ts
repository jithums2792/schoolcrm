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

  constructor(private staffservice: FacultyService,
              private chatservice: ChatService,
              private toastrservice: ToastrService) { }

  ngOnInit() {
    this.getAllstaff()
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



}
