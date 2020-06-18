import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { ClassallocationComponent } from './faculty-control/classallocation/classallocation.component'
import { CreatetimetableComponent } from './class-control/createtimetable/createtimetable.component';


const routes: Routes = [
  {path: '', component: LayoutComponent, children: [
    {path: 'faculty', component: TeachermangementComponent},
    {path: 'createfaculty', component: FacultycreateComponent},
    {path: 'department', component: DepartmentcontrolComponent},
    {path: 'designation', component: DesignationcontrolComponent},
    {path: 'classlist', component: ClasslistComponent},
    {path: 'studentlist', component: StudentlistComponent},
    {path: 'admision', component: StudentadmisionComponent},
    {path: 'classtimetable', component: ClasstimetableComponent},
    {path: 'createtimetable', component: CreatetimetableComponent},
    {path: 'subjectallocation', component: SubjectallocationComponent},
    {path: 'classsetup', component: ClassallocationComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
