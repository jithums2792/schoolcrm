import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudentclassComponent } from './studentclass/studentclass.component';
import { StudymaterialComponent } from './studymaterial/studymaterial.component';
import { ExamsComponent } from './exams/exams.component';
import { AttendexamComponent } from './attendexam/attendexam.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeworkComponent } from './homework/homework.component';
import { LoginGuard } from '../Auth/login.guard';
import { LeavelistComponent } from './leavelist/leavelist.component';
import { CreateleaveComponent } from './createleave/createleave.component';
import { ChatComponent } from './chat/chat.component';
import { NoticeboardComponent } from './noticeboard/noticeboard.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { LibraryComponent } from './library/library.component';
import { BbbsComponent } from './bbbs/bbbs.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent, children: [
    {path: 'profile', component: ProfileComponent},
    {path: 'class', component: StudentclassComponent},
    {path: 'studymaterial', component: StudymaterialComponent},
    {path: 'homework', component: HomeworkComponent},
    {path: 'chat', component: ChatComponent},
    {path: 'exams', component: ExamsComponent},
    {path: 'attendexam', component: AttendexamComponent},
    {path: 'leavelist', component: LeavelistComponent},
    {path: 'createleave', component: CreateleaveComponent},
    {path: 'noticeboard', component: NoticeboardComponent},
    {path: 'attendance', component: AttendanceComponent},
    {path: 'library', component: LibraryComponent},
    {path: 'bbb', component: BbbsComponent},
    {path: '', redirectTo: 'class', pathMatch: 'full'}
  ], canActivate: [LoginGuard]},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
