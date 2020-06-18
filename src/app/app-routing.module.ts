import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeachersModule } from './teachers/teachers.module';
import { StudentModule } from './student/student.module';
import { LandingModule } from './landing/landing.module';
import { LoginGuard } from './Auth/login.guard';
import { TeacherloginGuard } from './Auth/teacherlogin.guard';


const routes: Routes = [
  {path: 'home', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)},
  {path: 'teacher', loadChildren: () => import('./teachers/teachers.module').then(m => m.TeachersModule), canActivate: [TeacherloginGuard]},
  {path: 'student', loadChildren: () => import('./student/student.module').then(m => m.StudentModule), canActivate: [LoginGuard]},
  {path: 'sadmin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
