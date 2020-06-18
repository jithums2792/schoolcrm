import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from 'src/app/services/departments.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-departmentcontrol',
  templateUrl: './departmentcontrol.component.html',
  styleUrls: ['./departmentcontrol.component.css']
})
export class DepartmentcontrolComponent implements OnInit {
  public departmentList = [];
  public saveFlag = true;
  public checkFlag;
  public department;
  public departmentId;
  constructor(private departmentservice: DepartmentsService, private toastservice: ToastrService) { }

  ngOnInit() {
    this.getAllDepartment();
  }
  async getAllDepartment() {
    this.departmentservice.getDepartmentList().subscribe(data => this.departmentList = data.data);
  }
  async save() {
    const status = await this.departmentList.some(element => element.name.toLowerCase() === this.department.toLowerCase());
    if (status) {
      this.toastservice.warning('Already in List', 'Warning');
    } else {
      let department = {
        name: this.department
      };
      this.departmentservice.addDepartment(department).subscribe(data => this.departmentList.push(data.data));
      this.department = ''; 
      this.toastservice.success( this.department +' added to list', 'Success');
    }
    
  }

  async update() {
    const updatedDepartment = {
      name: this.department
    };
    this.departmentservice.updateDepartment(this.departmentId, updatedDepartment).subscribe(data => {
      if (data.status === "success") {
        this.getAllDepartment();
        this.department = '';
        this.toastservice.success('updated', 'success')
      } else {
        this.toastservice.error('something wrong','Error')
      }
    });
    this.saveFlag = true;
  }

  async cancel() {
    this.department = '';
    this.departmentId =  '';
    this.saveFlag = true;
  }

  async edit(department) {
   this.saveFlag = false;
   this.department = department.name;
   this.departmentId = department._id;
   console.log(department);
  }

  async delete(department) {
    this.departmentservice.deleteDepartment(department._id).subscribe(data => (data.status === "success") ? this.getAllDepartment():console.log('err'));
  }

 

}
