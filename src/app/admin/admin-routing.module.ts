import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { TeachermangementComponent } from './teachermangement/teachermangement.component';
import { FacultycreateComponent } from './facultycreate/facultycreate.component';
import { DepartmentcontrolComponent } from './departmentcontrol/departmentcontrol.component';
import { DesignationcontrolComponent } from './designationcontrol/designationcontrol.component';


const routes: Routes = [
  {path: '', component: LayoutComponent, children: [
    {path: 'faculty', component: TeachermangementComponent},
    {path: 'createfaculty', component: FacultycreateComponent},
    {path: 'department', component: DepartmentcontrolComponent},
    {path: 'designation', component: DesignationcontrolComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
