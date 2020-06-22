import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  @Input() satrtdate
  @Input() enddDate
  @Output() state = new EventEmitter<any>()
  // public startData = '2020-06-19T17:45'
  // public stopData = '2020-06-19T18:45'

  public day
  public hour
  public min
  public sec
  public res

  constructor() { }

  async ngOnInit() {
    setTimeout(() => {
      this.test()
    }, 1000);
    setInterval(() => {
      if(this.res >= 0) {
        this.day = Math.floor(this.res / 86400);
        this.hour = Math.floor(this.res / 3600) % 24;
        this.min = Math.floor(this.res / 60) % 60;
        this.sec = this.res % 60;  
        this.res = this.res - 1
      } else {
        this.state.emit(false)
      }
      
    },1000)
  }
  
  async test() {
    let date1 =  +new Date(this.satrtdate)
    let date2 =  +new Date(this.enddDate)
    console.log(date1,date2)
    if (date1 < date2) {
      console.log(date2)
      this.res = Math.abs(date1 - date2)/1000
    } else {
      this.state.emit(false)
      console.log(date1)
    }
    
  }

}
