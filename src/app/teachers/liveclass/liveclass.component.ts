import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-liveclass',
  templateUrl: './liveclass.component.html',
  styleUrls: ['./liveclass.component.css']
})
export class LiveclassComponent implements OnInit {
  public socket = io(environment.socket, {query: {
    usertype: 'teacher',
    displayname: 'tempteacher'
 }  });

 public localStream;
  public configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
  public peerConnection = [];
  public constrains = { audio: true, video: {
    width: {
      min: 640, max: 1024
    }, height: {
      min: 480, max: 768
    }
  } };
  public localVideo: HTMLVideoElement;
  public remoteVideo: HTMLVideoElement;


  constructor() { }

  async ngOnInit() {
    this.socket.on('connection', (data) => console.log(data));


    this.socket.on('newestudentjoined', async (studentid) => {

      if (this.localStream != null) {
        this.peerConnection[studentid] = new RTCPeerConnection(this.configuration);

        this.localStream.getTracks().forEach(track => {
          this.peerConnection[studentid].addTrack(track, this.localStream);
        });

        console.log('newestudentjoined ');
        const offer = await this.peerConnection[studentid].createOffer();
        this.peerConnection[studentid].setLocalDescription(offer);
        console.log('offer created on teacher side', offer);

        const offerObject = {
          studentid:studentid,
          offer:offer
        };
        this.socket.emit('newoffer', offerObject);

        this.setupPeerconnection(studentid);
      }



    });

    this.peerConnection.forEach(pc => {

    });

    this.socket.on('answer', async (answerObject) => {
      this.peerConnection[answerObject.studentid].setRemoteDescription(new RTCSessionDescription(answerObject.answer));
    });

    this.socket.on('onicecandidatestudent', async (iceCandidateobject) => {
      console.log('onicecandidatestudent received on teacher side');
      console.log(iceCandidateobject);
      // console.log(msg.data)
      this.peerConnection[iceCandidateobject.studentid].addIceCandidate(new RTCIceCandidate(iceCandidateobject.candidate));

    });

  }


  setupPeerconnection(studentid) {
    const remotestream = new MediaStream();
    const remotehost = document.getElementById('remote');
    this.remoteVideo = document.createElement('video');
    this.remoteVideo.setAttribute('autoplay', 'true');
    this.remoteVideo.srcObject = remotestream;
    console.log('got video element');
    remotehost.appendChild(this.remoteVideo);
    this.peerConnection[studentid].onicecandidate = (msg) => {
        console.log('onicecandidateteacher triggered teacher side');
        if (msg.candidate) {
        const iceCandidateobject = {
          studentid:studentid,
          candidate: msg.candidate
        };
        this.socket.emit('onicecandidateteacher', iceCandidateobject );
      }
    };


    this.peerConnection[studentid].ontrack = (event) => {
      console.log('ontrack triggered teacher side');
      remotestream.addTrack(event.track);
      console.log('got mediastream', event.streams);

    };
  }

  async activateLiveStream() {
    const localHost = document.getElementById('hostvideo');
    this.localVideo = document.createElement('video');
    this.localVideo.setAttribute('autoplay', 'true');
    this.localStream = await navigator.mediaDevices.getUserMedia(this.constrains);
    this.localVideo.srcObject = this.localStream;
    localHost.appendChild(this.localVideo);
  }

}
