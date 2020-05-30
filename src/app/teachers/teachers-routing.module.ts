import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClassComponent } from './class/class.component';
import { LiveclassComponent } from './liveclass/liveclass.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent, children: [
    {path: 'class', component: ClassComponent},
    {path: 'liveclass', component: LiveclassComponent},
    {path: '', redirectTo: 'class', pathMatch: 'full'}
  ]},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersRoutingModule { }
