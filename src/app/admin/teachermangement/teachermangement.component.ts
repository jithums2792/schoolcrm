import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teachermangement',
  templateUrl: './teachermangement.component.html',
  styleUrls: ['./teachermangement.component.css']
})
export class TeachermangementComponent implements OnInit {
  public designationList = [
    {title: 'All'},
    {title: 'Teacher'},
    {title: 'HOD'},
    {title: 'Principale'}
  ]
  public designation = 'All';
  
  constructor(private router: Router) { }

  ngOnInit() {
  }
  async designationfilter() {
    console.log('eorking')
  }

}
