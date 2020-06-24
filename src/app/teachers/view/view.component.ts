import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  studentInfo
  subject
  contentList = []

  constructor(private router: Router) {
    try {
      this.studentInfo = router.getCurrentNavigation().extras.state.data
      this.subject = router.getCurrentNavigation().extras.state.subname
    } catch (error) {
      router.navigate(['/teacher/home/homework'])
    }
   }

  ngOnInit() {
    this.getcontent()
  }

  async getcontent() {
    await this.studentInfo.content.find(element => {
      if (element.subject === this.subject) {
        this.contentList.push(element)
      }
    })
    console.log(this.contentList)
  }

}
