import { Component, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-classlist',
  templateUrl: './classlist.component.html',
  styleUrls: ['./classlist.component.css']
})
export class ClasslistComponent implements OnInit {
  public classList = [];
  public className = '';
  public sectionCount = null;
  public classId;
  public saveFlag = true;

  constructor(private classservice: ClassesService, private toastservice: ToastrService) { }

  ngOnInit() {
    this.getAllClass();
  }

  async getAllClass() {
    this.classservice.getAllclass().subscribe(data => this.classList = data.data);
  }
  async save() {
    if (this.className === '' || this.sectionCount === null) {
      this.toastservice.warning('some fields are missing', 'Warning');
    } else {
      const status = this.classList.some( element => element.name === this.className);
      if (status) {
        this.toastservice.warning('Already in List', 'Warning');
      } else {
        let Class = {
          name: '',
          section: []
        };
        for(let i = 1; i<= this.sectionCount; i++) {
          Class.section.push('A'+i);
        };
        Class.name = this.className;
        this.classservice.addClass(Class).subscribe(data => {
          console.log(data);
          if (data.status === 'success') {
            this.toastservice.success('class created', 'Success');
            this.getAllClass();
            this.cancel();
          } else {
            this.toastservice.error('something wrong', 'Error');
          }
        })
      }
    }
  }

  async edit(data) {
    this.saveFlag = false;
    this.classId = data._id;
    this.className = data.name;
    this.sectionCount = data.section.length;
  }

  async update() {
    let Class = {
      name: '',
      section: []
    };
    for(let i = 1; i<= this.sectionCount; i++) {
      Class.section.push('A'+i);
    };
    Class.name = this.className;
    this.classservice.updateClass(this.classId, Class).subscribe(data => {
      console.log(data);
      if (data.status === 'success') {
        this.toastservice.success('class updated', 'Success');
        this.getAllClass();
        this.saveFlag = true;
        this.cancel();
      } else {
        this.toastservice.error('something wrong', 'Error');
      }
    })
  }

  async cancel() {
    this.saveFlag = true;
    this.className = '';
    this.sectionCount = null;
  }

  async delete(data) {
    this.classservice.deleteClass(data._id).subscribe(data => {
      if (data.status === 'success') {
        this.toastservice.success('deleted successfully', 'Success');
        this.getAllClass();
      } else {
        this.toastservice.error('something wrong', 'Error');
      }
    })
  }

}
