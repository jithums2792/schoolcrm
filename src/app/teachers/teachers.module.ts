import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';

import { TeachersRoutingModule } from './teachers-routing.module';
import { HomeComponent } from './home/home.component';
import { ClassComponent } from './class/class.component';
import { LiveclassComponent } from './liveclass/liveclass.component';
import { StudymaterialComponent } from './studymaterial/studymaterial.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [HomeComponent, ClassComponent, LiveclassComponent, StudymaterialComponent, ProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    TeachersRoutingModule
  ]
})
export class TeachersModule { }
