import { Component, OnInit, TemplateRef  } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { StudentsService } from 'src/app/services/students.service';
import { FacultyService } from 'src/app/services/faculty.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  modalRef: BsModalRef;
  public tile = 1;
  public login = false;
  public username;
  public password;

  constructor(private router: Router, 
              private studentservice: StudentsService,
              private modalService: BsModalService, 
              private toastrservice: ToastrService,
              private facultyservice: FacultyService) { }

  ngOnInit() {
  }

  studentlogin(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-dialog-centered'});
    const data = {
      username: this.username,
      password: this.password
    }
    this.studentservice.login(data).subscribe(data => {
      if (data.data.length >= 1) {
        this.modalRef.hide()
        this.toastrservice.success('Login success','Success')
        localStorage.setItem('student', data.data[0]._id);
        localStorage.setItem('studentname',data.data[0].firstname)
        this.router.navigate(['/student']);
      } else {
        this.toastrservice.warning('Invalid creadintials', 'Warning')
        this.modalRef.hide()
      }
    });
  }
  teacherlogin(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-dialog-centered'});
    const data = {
      username: this.username,
      password: this.password
    };
    this.facultyservice.login(data).subscribe(data => {
      if (data.data.length >= 1) {
        this.modalRef.hide()
        this.toastrservice.success('Login success','Success')
        localStorage.setItem('teacher', data.data[0]._id);
        localStorage.setItem('teachername',data.data[0].firstname + ' ' + data.data[0].lastname)
        this.router.navigate(['/teacher']);
      }else {
        this.toastrservice.warning('Invalid creadintials', 'Warning')
        this.modalRef.hide()
      }
      
    })
  }

}
