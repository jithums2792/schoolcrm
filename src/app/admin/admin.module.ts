import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { TeachermangementComponent } from './teachermangement/teachermangement.component';
import { FacultycreateComponent } from './facultycreate/facultycreate.component';
import { DepartmentcontrolComponent } from './departmentcontrol/departmentcontrol.component';
import { DesignationcontrolComponent } from './designationcontrol/designationcontrol.component';
import { ClasslistComponent } from './class-control/classlist/classlist.component';
import { StudentlistComponent } from './student-controls/studentlist/studentlist.component';
import { StudentadmisionComponent } from './student-controls/studentadmision/studentadmision.component';
import { ClasstimetableComponent } from './class-control/classtimetable/classtimetable.component';
import { SubjectallocationComponent } from './faculty-control/subjectallocation/subjectallocation.component';
import { ClassallocationComponent } from './faculty-control/classallocation/classallocation.component';
import { CreatetimetableComponent } from './class-control/createtimetable/createtimetable.component';


@NgModule({
  declarations: [LayoutComponent, 
    TeachermangementComponent, 
    FacultycreateComponent, 
    DepartmentcontrolComponent, 
    DesignationcontrolComponent, 
    ClasslistComponent, 
    StudentlistComponent, 
    StudentadmisionComponent, 
    ClasstimetableComponent, 
    SubjectallocationComponent,
    ClassallocationComponent,
    CreatetimetableComponent],
  imports: [
    CommonModule,
    FormsModule,
    TimepickerModule.forRoot(),
    MaterialModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
