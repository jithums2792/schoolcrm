import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DesignationService } from '../../services/designation.service';

@Component({
  selector: 'app-designationcontrol',
  templateUrl: './designationcontrol.component.html',
  styleUrls: ['./designationcontrol.component.css']
})
export class DesignationcontrolComponent implements OnInit {
  public designationtList = [];
  public saveFlag = true;
  public checkFlag;
  public designation;
  public designationId;


  constructor(private designationservice: DesignationService, private toastservice: ToastrService) { }

  ngOnInit() {
    this.getAllDesignation()
  }

  async getAllDesignation() {
     this.designationservice.getDesignationList().subscribe(data => this.designationtList = data.data);
  }
  async save() {
    const status = await this.designationtList.some(element => element.name.toLowerCase() === this.designation.toLowerCase());
    if (status) {
      this.toastservice.warning('Already in List', 'Warning');
    } else {
      let designation = {
        name: this.designation
      };
      this.designationservice.addDesignation(designation).subscribe(data => this.designationtList.push(data.data));
      this.designation = ''; 
      this.toastservice.success( this.designation +' added to list', 'Success');
    }
    
  }

  async update() {
    const updatedDepartment = {
      name: this.designation
    };
    this.designationservice.updateDesignation(this.designationId, updatedDepartment).subscribe(data => {
      if (data.status === "success") {
        this.getAllDesignation();
        this.designation = '';
        this.toastservice.success('updated', 'success')
      } else {
        this.toastservice.error('something wrong','Error')
      }
    });
    this.saveFlag = true;
  }

  async cancel() {
    this.designation = '';
    this.designationId =  '';
    this.saveFlag = true;
  }

  async edit(designation) {
   this.saveFlag = false;
   this.designation = designation.name;
   this.designationId = designation._id;
   console.log(designation);
  }

  async delete(designation) {
    this.designationservice.deleteDesignation(designation._id).subscribe(data => (data.status === "success") ? this.getAllDesignation():console.log('err'));
  }

}
