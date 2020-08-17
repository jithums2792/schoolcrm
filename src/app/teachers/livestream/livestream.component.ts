import { Component, OnInit, ViewChild, ElementRef, TemplateRef  } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-livestream',
  templateUrl: './livestream.component.html',
  styleUrls: ['./livestream.component.css']
})
export class LivestreamComponent implements OnInit {
  @ViewChild('hostvideo', {static: true}) hostvideo:ElementRef
  modalRef: BsModalRef
  public peerConnection
  public localstream
  public remotestream
  public config = { iceServers: [
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
  public flags = {
    start: true,
    stop: false,
    mic: true,
    nomic: false,
    screenshare: true
  }
  public videoConstrains = {
    audio: true,
    video: true
  }
  public screenshareConstrains = {
    audio: true,
    video: true
  }
  public screenshareConfig = 'device'

  constructor(private toastservice: ToastrService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.peerConnection = new webkitRTCPeerConnection(this.config)
    this.peerConnection.onnegotiationneeded = () => {
      console.log('evnt trigered')
    }
    console.log(this.hostvideo)
    console.log(this.peerConnection)
  }

  async startVideo() {
    this.peerConnection = new webkitRTCPeerConnection(this.config)
    navigator.mediaDevices.getUserMedia(this.videoConstrains).then(stream => {
      this.flags.start = false
      this.flags.stop = true
      this.localstream = stream
      this.hostvideo.nativeElement.srcObject = stream
      stream.getTracks().forEach(async track => {
        await this.peerConnection.addTrack(track, stream)
      })
      
    })
    .catch(err => this.toastservice.error('No media device detected', 'Error'))
  }
  async stop() {
    this.localstream.getTracks().forEach(track => {
      track.stop()
    });
    this.peerConnection.close()
    this.flags.start = true
    this.flags.stop = false
    this.toastservice.success('Live stream stoped', 'Success')
  }
  async mute() {
    this.flags.mic = false
    this.flags.nomic = true
    this.videoConstrains.audio = false
    this.startVideo()
  }

  async unmute() {
    this.flags.mic = true
    this.flags.nomic = false
    this.videoConstrains.audio = true
    this.startVideo()
  }

  async screenshare(template: TemplateRef<any>) {
    this.flags.start = false
    this.modalRef = this.modalService.show(template);
  }

  async setConfig() {
    switch (this.screenshareConfig) {
      case 'device': this.deviceAudio()
        break;
      case 'user': this.useraudio()
        break;
      case 'all': this.bothAudio()
        break
      default:
        break;
    }
  }

  async deviceAudio() {
    console.log('device setup')
    const screeniaDevice = navigator.mediaDevices as any;
    await screeniaDevice.getDisplayMedia(this.screenshareConstrains)
    .then((stream) => {
      this.localstream = stream
      this.hostvideo.nativeElement.srcObject = stream
      this.modalRef.hide()
      stream.getTracks().forEach(track => {
        this.peerConnection.addTrack(track, stream)
      });
    }).catch((err) => {
      this.toastservice.error('Your device not support screen share','Error')
    });
  }
  async useraudio() {
    this.screenshareConstrains.audio = false
    console.log('device setup')
    const screeniaDevice = navigator.mediaDevices as any;
    await screeniaDevice.getDisplayMedia(this.screenshareConstrains)
    .then((stream) => {
      this.localstream = stream
      this.hostvideo.nativeElement.srcObject = stream
      this.modalRef.hide()
      stream.getVideoTracks().forEach(track => {
        this.peerConnection.addTrak(track, stream)
      });
      navigator.mediaDevices.getUserMedia({audio: true, video: false})
      .then(stream => {
        stream.getAudioTracks().forEach(track => {
          this.peerConnection.addTrack(track, stream)
        })
      })
    }).catch((err) => {
      this.toastservice.error('Your device not support screen share','Error')
    });
  }

  async bothAudio() {
    this.screenshareConstrains.audio = true
    console.log('device setup')
    const screeniaDevice = navigator.mediaDevices as any;
    await screeniaDevice.getDisplayMedia(this.screenshareConstrains)
    .then((stream) => {
      this.localstream = stream
      this.hostvideo.nativeElement.srcObject = stream
      this.modalRef.hide()
      stream.getVideoTracks().forEach(track => {
        this.peerConnection.addTrak(track, stream)
      });
      navigator.mediaDevices.getUserMedia({audio: true, video: false})
      .then(stream => {
        stream.getAudioTracks().forEach(track => {
          this.peerConnection.addTrack()
        })
      })
    }).catch((err) => {
      this.toastservice.error('Your device not support screen share','Error')
    });
  }

}
