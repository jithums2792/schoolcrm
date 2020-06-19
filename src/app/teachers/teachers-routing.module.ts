import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClassComponent } from './class/class.component';
import { LiveclassComponent } from './liveclass/liveclass.component';
import { StudymaterialComponent } from './studymaterial/studymaterial.component';
import { ProfileComponent } from './profile/profile.component';
import { ExamsComponent } from './exams/exams.component';
import { CreateexamComponent } from './createexam/createexam.component';
import { TeacherloginGuard } from '../Auth/teacherlogin.guard';


const routes: Routes = [
  {path: 'home', component: HomeComponent, children: [
    {path: 'class', component: ClassComponent},
    {path: 'liveclass', component: LiveclassComponent},
    {path: 'studymaterial', component: StudymaterialComponent},
    {path: 'myprofile', component: ProfileComponent},
    {path: 'exams', component: ExamsComponent},
    {path: 'createexam', component: CreateexamComponent},
    {path: '', redirectTo: 'myprofile', pathMatch: 'full'}
  ], canActivate: [TeacherloginGuard]},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersRoutingModule { }
