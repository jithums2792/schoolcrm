import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public username


  constructor(private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('teachername')) {
      this.username = localStorage.getItem('teachername')
    } else if(localStorage.getItem('studentname')) {
      this.username = localStorage.getItem('studentname')
    }
  }

  async logout() {
    localStorage.removeItem('teacher');
    localStorage.removeItem('teachername')
    this.router.navigate(['/home']);
  }
}
