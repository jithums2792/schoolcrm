import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

declare var MediaRecorder: any;

@Component({
  selector: 'app-liveclass',
  templateUrl: './liveclass.component.html',
  styleUrls: ['./liveclass.component.css']
})
export class LiveclassComponent implements OnInit {
  
  public playFlag = true;
  public VideobuttonFlag = true;
  public audiobuttonFlag = true;
  public studentId;
  public socket = io(environment.socket, {query: {
    usertype: 'teacher',
    displayname: 'tempteacher',
    transports: ['websocket']
 }  });

 public localStream;
 public configuration = { iceServers: [
    { urls: 'stun:stun.l.google.com:19302'},
    {
      urls: 'turn:numb.viagenie.ca',
      credential: 'muazkh',
      username: 'webrtc@live.com'
  },
  {
      urls: 'turn:192.158.29.39:3478?transport=udp',
      credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
      username: '28224511:1379330808'
  },
  {
      urls: 'turn:192.158.29.39:3478?transport=tcp',
      credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
      username: '28224511:1379330808'
  },
  {
      urls: 'turn:turn.bistri.com:80',
      credential: 'homeo',
      username: 'homeo'
   },
   {
      urls: 'turn:turn.anyfirewall.com:443?transport=tcp',
      credential: 'webrtc',
      username: 'webrtc'
  }
  ] };


  public peerConnection = [];
  public constrains = { audio: {echoCancellation: true}, video: {
    width: {
      min: 640, max: 1024
    }, height: {
      min: 480, max: 768
    }
  } };
  public localVideo: HTMLVideoElement;
  public remoteVideo: HTMLVideoElement;
  public mediaRecoder;
  public  recordedBlobs = [];

  constructor(private router: Router, private toastservice: ToastrService) { }

  async ngOnInit() {
    console.log(this.VideobuttonFlag);
    console.log(environment.socket);
    this.socket.on('connection', (data) => console.log(data));


    this.socket.on('newestudentjoined', async (studentid, socketId) => {

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

        this.setupPeerconnection(studentid, socketId);
      }



    });

    this.peerConnection.forEach(pc => {

    });

    this.socket.on('answer', async (answerObject) => {
      this.peerConnection[answerObject.studentid].setRemoteDescription(new RTCSessionDescription(answerObject.answer));
    });
    this.socket.on('studentLeave', async (data) => {
      const target = await document.getElementById(data);
      target.remove();
    })
    this.socket.on('onicecandidatestudent', async (iceCandidateobject) => {
      console.log('onicecandidatestudent received on teacher side');
      console.log(iceCandidateobject);
      this.studentId = iceCandidateobject.studentid;
      // console.log(msg.data)
      this.peerConnection[iceCandidateobject.studentid].addIceCandidate(new RTCIceCandidate(iceCandidateobject.candidate));
      console.log(this.peerConnection);
    });

  }


  setupPeerconnection(studentid, socketId) {
    const remotestream = new MediaStream();
    const remotehost = document.getElementById('remote');
    this.remoteVideo = document.createElement('video');
    this.remoteVideo.setAttribute('autoplay', 'true'); 
    this.remoteVideo.setAttribute('id', socketId); 
    this.remoteVideo.srcObject = remotestream;
    this.remoteVideo.width = 200;
    this.remoteVideo.height = 250;
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


    this.peerConnection[studentid].ontrack = async (event) => {
      console.log('ontrack triggered teacher side');
      await remotestream.addTrack(event.track);
      console.log('got mediastream', event.track);

    };
  }

  async activateLiveStream() {
    let options = {mimeType: 'video/webm;codecs=vp9,opus'};
    const localHost = document.getElementById('hostvideo');
    this.localVideo = document.createElement('video');
    this.localVideo.setAttribute('autoplay', 'true');
    this.localVideo.volume = 0;
    this.localVideo.setAttribute('id', 'localstream');
    await navigator.mediaDevices.getUserMedia(this.constrains).then( async stream  => {
      stream.getAudioTracks()[0].enabled = this.audiobuttonFlag;
      stream.getVideoTracks()[0].enabled = this.VideobuttonFlag;
      this.localVideo.srcObject = stream;
      this.localStream = stream;
      localHost.replaceChild(this.localVideo, localHost.childNodes[1]);
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.error(`${options.mimeType} is not supported`);
        options = {mimeType: 'video/webm;codecs=vp8,opus'};
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          console.error(`${options.mimeType} is not supported`);
          options = {mimeType: 'video/webm'};
          if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            console.error(`${options.mimeType} is not supported`);
            options = {mimeType: ''};
          }
        }
      }
      this.mediaRecoder = await new MediaRecorder(this.localStream, {mimeType: 'video/x-matroska;codecs=avc1,opus'});
      this.mediaRecoder.onstop = (event) => {
        console.log('Recorder stopped: ', event);
        console.log('Recorded Blobs: ', this.recordedBlobs);
      };
      this.mediaRecoder.ondataavailable = (event) => {
        console.log('data available');
        this.recordedBlobs.push(event.data)
      }
      this.mediaRecoder.start();
    }).catch (err => {
      this.toastservice.error('cant get media', 'error');
    })

    
  }

  async startStream() {
    this.playFlag = false;
    this.VideobuttonFlag = true;
    this.audiobuttonFlag = true;
    this.activateLiveStream();
  }
  async stopStream() {
    const recordList = document.getElementById('recordedVideo');
    this.mediaRecoder.stop();
    this.playFlag = true;
    this.VideobuttonFlag = false;
    this.audiobuttonFlag = false;
    const blob = new Blob(this.recordedBlobs, {type: 'video/x-matroska;codecs=avc1,opus'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    recordList.appendChild(a);
    this.activateLiveStream();
  }

  async videoControl(value){
    this.VideobuttonFlag = value;
    this.activateLiveStream();
    console.log(this.localStream);
  }

  async audioControl(value){
    this.audiobuttonFlag = value;
    this.activateLiveStream();
  }
  async screenShare() {
    const localHost = document.getElementById('hostvideo');
    this.localVideo = document.createElement('video');
    this.localVideo.setAttribute('autoplay', 'true');
    this.localVideo.setAttribute('id', 'localstream');
    const screeniaDevice = navigator.mediaDevices as any;
    await screeniaDevice.getDisplayMedia({video: true, audio: true}).then(stream => {
    this.localVideo.srcObject = stream;
    this.localStream = stream;
   
    localHost.replaceChild(this.localVideo, localHost.childNodes[1]);
    }).catch(err => {
      this.toastservice.error('your device not support sharing now..!', 'error');
    });
  }

}
