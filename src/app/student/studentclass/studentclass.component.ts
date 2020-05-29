import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-studentclass',
  templateUrl: './studentclass.component.html',
  styleUrls: ['./studentclass.component.css']
})
export class StudentclassComponent implements OnInit {
  localVideo: HTMLVideoElement;
  remoteVideo: HTMLVideoElement;
  public socket;
  public configuration = {iceServers: [{urls: 'stun:stun.l.google.com:19302'}]};
  public peerConnection = new RTCPeerConnection(this.configuration);

  constructor() { }



  async ngOnInit() {
   this.socket = io(environment.socket);
   this.socket.on('connection', (data) => console.log(data));

   this.socket.on('message', async (msg) => {

     if (msg.type === 'offer') {
      console.log('got offer', msg);

      const localStream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
      const localhost = document.getElementById('host');
      this.localVideo = document.createElement('video');
      this.localVideo.setAttribute('autoplay', 'true');
      this.localVideo.srcObject = localStream;
      localhost.appendChild(this.localVideo);

      localStream.getTracks().forEach(track => {
        this.peerConnection.addTrack(track, localStream);
      });


      const offer = await this.peerConnection.createOffer();
      this.peerConnection.setLocalDescription(new RTCSessionDescription(offer));

      this.peerConnection.setRemoteDescription(new RTCSessionDescription(msg));
      const answer = await this.peerConnection.createAnswer();
      console.log('answer created', answer);
      this.peerConnection.setLocalDescription(answer).then(() => this.socket.emit('message', answer));

      this.peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          this.socket.emit('message', event.candidate);
        }
      };


     } else {
       console.log('candiadate from class', msg);
       this.peerConnection.addIceCandidate(new RTCIceCandidate(msg));

       this.peerConnection.ontrack = (event) => {
        const remotestream = new MediaStream();
        remotestream.addTrack(event.track);
        console.log('got mediastream', event.streams);
        const remotehost = document.getElementById('remote');
        this.remoteVideo = document.createElement('video');
        this.remoteVideo.setAttribute('autoplay', 'true');
        this.remoteVideo.srcObject = remotestream;
        remotehost.appendChild(this.remoteVideo);

      };
     }

   });

  }
}
