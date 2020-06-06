import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { Ng2SmartTableModule } from 'ngx-smart-table';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { TeachermangementComponent } from './teachermangement/teachermangement.component';
import { FacultycreateComponent } from './facultycreate/facultycreate.component';
import { DepartmentcontrolComponent } from './departmentcontrol/departmentcontrol.component';
import { DesignationcontrolComponent } from './designationcontrol/designationcontrol.component';


@NgModule({
  declarations: [LayoutComponent, TeachermangementComponent, FacultycreateComponent, DepartmentcontrolComponent, DesignationcontrolComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    Ng2SmartTableModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
