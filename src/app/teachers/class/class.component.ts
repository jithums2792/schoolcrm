import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';


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



  constructor() { }

   async ngOnInit() {
    this.socket.on('connection', (data) => console.log(data));
    this.socket.on('message', async  (msg) => {
      if (msg.type === 'answer') {
        console.log('got answer', msg);
        this.peerConnection.setRemoteDescription(new RTCSessionDescription(msg));



        console.log('remote added');
      } else if (msg.type === 'offer') {
        console.log('got offer', msg);

      } else {
        console.log('got candidate', msg);
        this.peerConnection.addIceCandidate(new RTCIceCandidate(msg));

        this.peerConnection.ontrack = (event) => {
          console.log('media from student', event);
          const remotrstream = new MediaStream();
          remotrstream.addTrack(event.track);
          const remotehost = document.getElementById('remote');
          this.remoteVideo = document.createElement('video');
          this.remoteVideo.setAttribute('autoplay', 'true');
          this.remoteVideo.srcObject = remotrstream;
          remotehost.appendChild(this.remoteVideo);

        }
      }
    });

   }
  async activateLiveStream() {
     const localHost = document.getElementById('host');
     this.localVideo = document.createElement('video');
     this.localVideo.setAttribute('autoplay', 'true');
     const localStream = await navigator.mediaDevices.getUserMedia(this.constrains);
     this.localVideo.srcObject = localStream;
     localHost.appendChild(this.localVideo);
     localStream.getTracks().forEach(track => {
      this.peerConnection.addTrack(track, localStream);
    });

     this.peerConnection.onicecandidate = (msg) => {
      if (msg.candidate) {
        console.log('class icecandidate', msg);
        this.socket.emit('message', msg.candidate);
        }
    };

     const offer = await this.peerConnection.createOffer();
     this.peerConnection.setLocalDescription(offer);
     console.log('offer created', offer);
     this.socket.emit('message', offer);


   }

}
