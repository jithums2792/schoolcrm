import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClassComponent } from './class/class.component';
import { StudymaterialComponent } from './studymaterial/studymaterial.component';
import { ProfileComponent } from './profile/profile.component';
import { ExamsComponent } from './exams/exams.component';
import { CreateexamComponent } from './createexam/createexam.component';
import { TeacherloginGuard } from '../Auth/teacherlogin.guard';
import { AnswerlistComponent } from './answerlist/answerlist.component';
import { LeaveapprovelComponent } from './leaveapprovel/leaveapprovel.component';
import { ChatComponent } from './chat/chat.component';
import { HomeworkComponent } from './homework/homework.component';
import { ViewComponent } from './view/view.component';
import { NoticeboardComponent } from './noticeboard/noticeboard.component';
import { CreatesubjectiveexamComponent } from './createsubjectiveexam/createsubjectiveexam.component';
import { FileuploadsComponent } from './fileuploads/fileuploads.component';
import { BbbComponent } from './bbb/bbb.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent, children: [
    {path: 'class', component: ClassComponent},
    {path: 'studymaterial', component: StudymaterialComponent},
    {path: 'myprofile', component: ProfileComponent},
    {path: 'exams', component: ExamsComponent},
    {path: 'createexam', component: CreateexamComponent},
    {path: 'answerlist', component: AnswerlistComponent},
    {path: 'leaveapprove', component: LeaveapprovelComponent},
    {path: 'chat', component: ChatComponent},
    {path: 'homework', component: HomeworkComponent},
    {path: 'view', component: ViewComponent},
    {path: 'noticeboard', component: NoticeboardComponent},
    {path: 'subjectiveexam', component: CreatesubjectiveexamComponent},
    {path: 'fileuploads', component: FileuploadsComponent},
    {path: 'bbb', component: BbbComponent},
    {path: '', redirectTo: 'myprofile', pathMatch: 'full'},
    {path: '**', redirectTo: 'myprofile', pathMatch: 'full'},
  ], canActivate: [TeacherloginGuard]},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersRoutingModule { }
