import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  public startData = '2020-06-19T17:45'
  public stopData = '2020-06-19T18:45'
  public startYear
  public startMonth
  public startDay
  public startHour
  public startMin
  public startsec

  public endYear
  public endMonth
  public endDay
  public endHour
  public endMin
  public endsec

  constructor() { }

  ngOnInit() {
    this.test()
  }

  async manipulate() {
    this.startYear = this.startData.substr(0,4)
    this.startMonth = this.startData.substr(5,2)
    this.startDay = this.startData.substr(8,2)
    this.startHour = this.startData.substr(11,2)
    this.startMin = this.startData.substr(14,2)
    console.log(this.startYear, this.startMonth, this.startDay, this.startHour, this.startMin)
  }
  
  async test() {
    let date1 = +new Date(this.startData)
    let date2 = +new Date(this.stopData)
    let res = Math.abs(date1 - date2)/1000
    console.log(res)
  }

}
