import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { MathJaxModule } from 'ngx-mathjax';
import { ModalModule } from 'ngx-bootstrap/modal';

import { TeachersRoutingModule } from './teachers-routing.module';
import { HomeComponent } from './home/home.component';
import { ClassComponent } from './class/class.component';
import { LiveclassComponent } from './liveclass/liveclass.component';
import { StudymaterialComponent } from './studymaterial/studymaterial.component';
import { ProfileComponent } from './profile/profile.component';
import { ExamsComponent } from './exams/exams.component';
import { CreateexamComponent } from './createexam/createexam.component';


@NgModule({
  declarations: [HomeComponent, ClassComponent, LiveclassComponent, StudymaterialComponent, ProfileComponent, ExamsComponent, CreateexamComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ModalModule.forRoot(),
    MathJaxModule.forRoot({
      version: '2.7.5',
      config: 'TeX-AMS_HTML',
      hostname: 'cdnjs.cloudflare.com'
    }),
    TeachersRoutingModule
  ]
})
export class TeachersModule { }
