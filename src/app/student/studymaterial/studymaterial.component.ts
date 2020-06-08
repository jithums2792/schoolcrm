import { Component, OnInit } from '@angular/core';
import { FileuploadService } from 'src/app/services/fileupload.service';
import { DomSanitizer } from '@angular/platform-browser';

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
  public mediaList = [];

  constructor(private mediaservice: FileuploadService, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getStudymaterial()
  }

  getStudymaterial() {
    this.photoList = [];
    this.pdfList = [];
    this.docList = [];
    this.mediaservice.getAllfileByroomAndSection(localStorage.getItem('studentclass'),localStorage.getItem('studentsection')).subscribe(data =>{
      this.mediaList = data.data;
      this.mediaList.forEach(element => {
        if (element.type === 'image') {
          this.photoList.push(element);
        }
        if (element.type === 'doc') {
          this.docList.push(element);
        }
        if (element.type === 'pdf') {
          this.pdfList.push(element)
        }
        if (element.type === 'link') {
          this.linkList.push(element)
        }
      });
    }) 

  }
}
