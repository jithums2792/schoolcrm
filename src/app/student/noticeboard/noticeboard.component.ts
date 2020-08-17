import { Component, OnInit } from '@angular/core';
import { NoticeboardService } from 'src/app/services/noticeboard.service';

@Component({
  selector: 'app-noticeboard',
  templateUrl: './noticeboard.component.html',
  styleUrls: ['./noticeboard.component.css']
})
export class NoticeboardComponent implements OnInit {
  public noticeList = []
  public query1 = {
    room: localStorage.getItem('studentclass'),
    section: localStorage.getItem('studentsection')
  }
  public query2 = {
    room: 'All',
    section: 'All'
  }
  public query3 = {
    room: localStorage.getItem('studentclass'),
    section: 'All'
  }

  constructor(private noticeservice: NoticeboardService) { }

  async ngOnInit() {
    this.noticeList = []
    await this.getallNotice(this.query1)
    await this.getallNotice(this.query2)
    await this.getallNotice(this.query3)
  }

  async getallNotice(query) {
    this.noticeservice.getAllnoticeboardByQuery(query).subscribe(data => {
      data.data.forEach(notice => {
        this.noticeList.push(notice)
      });
      console.log(this.noticeList)
    })
  }

}
