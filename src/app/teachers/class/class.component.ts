import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FacultyService } from 'src/app/services/faculty.service';


@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  public classList = [];



  constructor(private staffservice: FacultyService,
              private router: Router) { }

   async ngOnInit() {
     this.getstaffinfo()
   }

   async getstaffinfo() {
     this.staffservice.getFacultyinfoByid(localStorage.getItem('teacher')).subscribe(data => {
       this.classList = data.data.assignedClass
     })

   }

   async navigate(value, section) {
     const option: NavigationExtras = {
       state: {data: value + section}
     };
     this.router.navigate(['/teacher/home/liveclass'], option)
   }



}
