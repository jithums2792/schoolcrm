import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liveclass',
  templateUrl: './liveclass.component.html',
  styleUrls: ['./liveclass.component.css']
})
export class LiveclassComponent implements OnInit {
  public url;

  constructor(private router: Router) { 
    try {
      this.url = this.router.getCurrentNavigation().extras.state.data
    } catch (error) {
      this.router.navigate(['/student/home/class'])
    }
  }

  ngOnInit() {
    console.log('requsted',this.url);
  }

}
