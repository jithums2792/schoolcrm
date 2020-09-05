import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FacultyService } from 'src/app/services/faculty.service';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import * as xml2js from 'xmltojson'
import { ToastrService } from 'ngx-toastr';
import { LivestreamService } from 'src/app/services/livestream.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  public classList = [];
  public socket 
  public teacher = {
    usertype: 'teacher',
    room: 'try',
    password: '',
    meetingID: ''
  }




  constructor(private staffservice: FacultyService,
              private router: Router,
              private toastservice: ToastrService,
              private liveservice: LivestreamService,
              private http: HttpClient) { }

   async ngOnInit() {
     this.getstaffinfo()
     this.socket = io.connect(environment.socket)
     this.socket.on('joined', (data) => console.log(data))
   }

   async getstaffinfo() {
     this.staffservice.getFacultyinfoByid(localStorage.getItem('teacher')).subscribe(data => {
       this.classList = data.data.assignedClass
     })

   }

  //  async navigate(value, section) {
  //    const option: NavigationExtras = {
  //      state: {data: value + section}
  //    };
  //    this.router.navigate(['/teacher/home/liveclass'], option)
  //  }
   async navigate(section:string) {
    const option: NavigationExtras = {
      state: {value: section}
    }
    this.router.navigate(['/teacher/home/bbb'], option)
   }



}
