import { Component, OnInit } from '@angular/core';
import { EventData } from 'ngx-event-calendar/lib/interface/event-data';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  dataArray: EventData[] = [] 
  public event = {   
    
}
  constructor() { }

  ngOnInit() {
  }

}

