import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {  MaterialModule } from '../material/material.module';

import { StudentRoutingModule } from './student-routing.module';
import { HomeComponent } from './home/home.component';
import { StudentclassComponent } from './studentclass/studentclass.component';
import { LiveclassComponent } from './liveclass/liveclass.component';
import { LivestreamWebrtcComponent } from './livestream-webrtc/livestream-webrtc.component';
import { StudymaterialComponent } from './studymaterial/studymaterial.component';
import { ExamsComponent } from './exams/exams.component';
import { AttendexamComponent } from './attendexam/attendexam.component';


@NgModule({
  declarations: [HomeComponent, StudentclassComponent, LiveclassComponent, LivestreamWebrtcComponent, StudymaterialComponent, ExamsComponent, AttendexamComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
