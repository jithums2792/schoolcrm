import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeachersModule } from './teachers/teachers.module';
import { StudentModule } from './student/student.module';
import { LandingModule } from './landing/landing.module';


const routes: Routes = [
  {path: 'home', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)},
  {path: 'teacher', loadChildren: () => import('./teachers/teachers.module').then(m => m.TeachersModule)},
  {path: 'student', loadChildren: () => import('./student/student.module').then(m => m.StudentModule)},
  {path: 'sadmin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
