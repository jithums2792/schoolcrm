import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { data } from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public statuscardData

  constructor(private dashboardservice: DashboardService) { }

  ngOnInit() {
    this.getcardData()
  }

  async getcardData() {
    this.dashboardservice.getstatusCard().subscribe(data => {
     this.statuscardData = data.data
    })
  }

}
