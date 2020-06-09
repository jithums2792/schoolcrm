import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { ClassesService } from 'src/app/services/classes.service';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {
  public socket = io.connect(environment.socket);
  public configuration = {iceServers: [{urls: 'stun:stun.l.google.com:19302'}]};
  public peerConnection = new RTCPeerConnection(this.configuration);
  public constrains = {audio: true, video: true};
  public localVideo: HTMLVideoElement;
  public remoteVideo: HTMLVideoElement;

  public classList = [];



  constructor(private classservice: ClassesService,private router: Router) { }

   async ngOnInit() {
     this.getAllclass();
   }

   async getAllclass() {
     this.classservice.getAllclass().subscribe(data => this.classList = data.data);
   }

   async navigate(value, section) {
     const option: NavigationExtras = {
       state: {data: value + section}
     };
     this.router.navigate(['/teacher/home/liveclass'], option)
   }

}
