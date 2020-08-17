import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ForgetComponent } from './forget/forget.component';


const routes: Routes = [
  {path: '', component: LayoutComponent},
  {path: 'forget', component: ForgetComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
