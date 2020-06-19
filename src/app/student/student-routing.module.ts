import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudentclassComponent } from './studentclass/studentclass.component';
import { LiveclassComponent } from './liveclass/liveclass.component';
import { LivestreamWebrtcComponent } from './livestream-webrtc/livestream-webrtc.component';
import { StudymaterialComponent } from './studymaterial/studymaterial.component';
import { ExamsComponent } from './exams/exams.component';
import { AttendexamComponent } from './attendexam/attendexam.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeworkComponent } from './homework/homework.component';
import { LoginGuard } from '../Auth/login.guard';


const routes: Routes = [
  {path: 'home', component: HomeComponent, children: [
    {path: 'profile', component: ProfileComponent},
    {path: 'class', component: StudentclassComponent},
    {path: 'liveclass', component: LiveclassComponent},
    {path: 'liveclass2', component: LivestreamWebrtcComponent},
    {path: 'studymaterial', component: StudymaterialComponent},
    {path: 'homework', component: HomeworkComponent},
    {path: 'exams', component: ExamsComponent},
    {path: 'attendexam', component: AttendexamComponent},
    {path: '', redirectTo: 'class', pathMatch: 'full'}
  ], canActivate: [LoginGuard]},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
