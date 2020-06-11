import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  async test() {
    window.open('http://google.com','pop', 'top=0, left=0, resizable=1, menubar=yes', true ).focus();
  }
}
