import { Component, OnInit } from '@angular/core';
import { NoticeboardService } from 'src/app/services/noticeboard.service';

@Component({
  selector: 'app-noticeboard',
  templateUrl: './noticeboard.component.html',
  styleUrls: ['./noticeboard.component.css']
})
export class NoticeboardComponent implements OnInit {
  public noticeList = []

  constructor(private noticeservice: NoticeboardService) { }

  ngOnInit() {
    this.getAllnotice()
  }

  async getAllnotice() {
    this.noticeservice.getAllnoticeboard().subscribe(data => this.noticeList = data.data)
  }

}
