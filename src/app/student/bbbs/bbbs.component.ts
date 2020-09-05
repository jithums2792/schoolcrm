import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-bbbs',
  templateUrl: './bbbs.component.html',
  styleUrls: ['./bbbs.component.css']
})
export class BbbsComponent implements OnInit {
  public data 

  constructor(private router: Router, 
              private sanitiser: DomSanitizer) { 
    try {
      const url = this.router.getCurrentNavigation().extras.state.value
      this.data = sanitiser.bypassSecurityTrustResourceUrl(url)
    } catch (error) {
     router.navigate(['/teacher/home/class'])
    }
  }

  ngOnInit() {
    
  }

}
