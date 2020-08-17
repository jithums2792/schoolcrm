import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-livestream-webrtc',
  templateUrl: './livestream-webrtc.component.html',
  styleUrls: ['./livestream-webrtc.component.css']
})
export class LivestreamWebrtcComponent implements OnInit {
  localVideo: HTMLVideoElement;
  remoteVideo: HTMLVideoElement;
  public mute = '';
  public socket;
  public offer;
  public configuration = { iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
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
  public peerConnection = new RTCPeerConnection(this.configuration);
  public room = 'English';
  public localStream




studentid = 'tempstudent' + Date.now();

  constructor() {
    this.room = localStorage.getItem('studentclass') + localStorage.getItem('studentsection');
   }

  async ngOnInit() {
    console.log(this.room)

    const localStream = await navigator.mediaDevices.getUserMedia({audio: true,video: true });
    this.localStream = localStream
    const localhost = document.getElementById('host');
    this.localVideo = document.createElement('video');
    this.localVideo.setAttribute('autoplay', 'true');
    this.localVideo.classList.add('ssss');
    this.localVideo.srcObject = localStream;
    this.localVideo.width = 200;
    this.localVideo.height = 250;
    this.localVideo.volume = 0;
    localhost.appendChild(this.localVideo);

    localStream.getTracks().forEach(track => {
      this.peerConnection.addTrack(track, localStream);

    });

    this.socket = io(environment.socket, {
      query: {
        usertype: 'student',
        studentid: this.studentid
      }
    });


    this.socket.emit('join', this.room);
    this.socket.on('join', data => {
      console.log(data)
    })
    this.socket.on('newoffer', async (offerObject) => {
      // console.log(msg.data)

      console.log("offerObject")
      console.log(offerObject)

      if (offerObject.studentid == this.studentid) {
        if (this.offer == null) {
          this.offer = offerObject.offer;

          this.peerConnection.setRemoteDescription(new RTCSessionDescription(offerObject.offer));
          const answer = await this.peerConnection.createAnswer();
          this.peerConnection.setLocalDescription(answer);

          var answerObject = {
            studentid: this.studentid,
            answer: answer,
            room: this.room
          }

          this.socket.emit('answer', answerObject);





        }
      }



    });

    this.peerConnection.onicecandidate = (msg) => {
      console.log('onicecandidatestudent triggered in student side' + msg)

      if (msg.candidate) {
        var iceCandidateobject = {
          studentid: this.studentid,
          candidate: msg.candidate,
          room: this.room
        }
        this.socket.emit('onicecandidatestudent', iceCandidateobject);
      }
    };

    this.peerConnection.ontrack = (event) => {
      let i = 0;
      const remotestream = new MediaStream();
      remotestream.addTrack(event.track);
      console.log('got mediastream', event.streams);
      const remotehost = document.getElementById('remote');
      this.remoteVideo = document.createElement('video');
      this.remoteVideo.setAttribute('autoplay', 'true');
      this.remoteVideo.classList.add('remote-video')
      this.remoteVideo.style.position = 'absolute';
      this.remoteVideo.style.width = '100vw';
      this.remoteVideo.style.top = '35%';
      this.remoteVideo.style.transform = 'translateY(-50%)';
      this.remoteVideo.srcObject = remotestream;
      remotehost.appendChild(this.remoteVideo);
      i++;
    };

    this.socket.on('onicecandidateteacher', async (iceCandidateobject) => {
      console.log('onicecandidateteacher recieved in student side')

      if (iceCandidateobject.studentid === this.studentid) {
        // console.log(msg.data)
        this.peerConnection.addIceCandidate(new RTCIceCandidate(iceCandidateobject.candidate));

      }
    });

    
  }


  ngOnDestroy() {
  this.localStream.getTracks().forEach(function(track) {
    track.stop();
  });
  this.socket.disconnect()
  }

  raiseahand() {
    console.log('clicked')
    this.socket.emit('raise',({room: this.room, id: this.studentid}))  
  }


}
