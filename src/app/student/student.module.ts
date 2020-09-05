import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {  MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module'
import { ModalModule } from 'ngx-bootstrap/modal'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'


import { StudentRoutingModule } from './student-routing.module';
import { HomeComponent } from './home/home.component';
import { StudentclassComponent } from './studentclass/studentclass.component';
import { StudymaterialComponent } from './studymaterial/studymaterial.component';
import { ExamsComponent } from './exams/exams.component';
import { AttendexamComponent } from './attendexam/attendexam.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeworkComponent } from './homework/homework.component';
import { LeavelistComponent } from './leavelist/leavelist.component';
import { CreateleaveComponent } from './createleave/createleave.component';
import { ChatComponent } from './chat/chat.component';
import { NoticeboardComponent } from './noticeboard/noticeboard.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { LibraryComponent } from './library/library.component';
import { BbbsComponent } from './bbbs/bbbs.component';

@NgModule({
  declarations: [HomeComponent, StudentclassComponent, StudymaterialComponent,ChatComponent, ExamsComponent, AttendexamComponent,ProfileComponent,HomeworkComponent, LeavelistComponent, CreateleaveComponent, NoticeboardComponent, AttendanceComponent, LibraryComponent, BbbsComponent,],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    FormsModule,
    StudentRoutingModule,
  ]
})
export class StudentModule { }
