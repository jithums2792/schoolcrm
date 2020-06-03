import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  MaterialModule } from '../material/material.module';

import { StudentRoutingModule } from './student-routing.module';
import { HomeComponent } from './home/home.component';
import { StudentclassComponent } from './studentclass/studentclass.component';
import { LiveclassComponent } from './liveclass/liveclass.component';


@NgModule({
  declarations: [HomeComponent, StudentclassComponent, LiveclassComponent],
  imports: [
    CommonModule,
    MaterialModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
