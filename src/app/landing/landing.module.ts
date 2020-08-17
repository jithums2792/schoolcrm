import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { LandingRoutingModule } from './landing-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { ForgetComponent } from './forget/forget.component';


@NgModule({
  declarations: [LayoutComponent, ForgetComponent],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    LandingRoutingModule
  ]
})
export class LandingModule { }
