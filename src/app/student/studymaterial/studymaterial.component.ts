import { Component, OnInit } from '@angular/core';
import { FileuploadService } from 'src/app/services/fileupload.service';

@Component({
  selector: 'app-studymaterial',
  templateUrl: './studymaterial.component.html',
  styleUrls: ['./studymaterial.component.css']
})
export class StudymaterialComponent implements OnInit {
  public photoList = [];
  public pdfList = [];
  public docList = [];
  public linkList = [];

  constructor(private mediaservice: FileuploadService) { }

  ngOnInit() {
    this.getStudymaterial()
  }

  getStudymaterial() {
    this.mediaservice.getAllfileByroomAndSection(localStorage.getItem('studentclass'),localStorage.getItem('studentsection')).subscribe(data => {
      this.photoList = data.data;
    })
  }

}
