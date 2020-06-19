import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmarttableComponent } from './smarttable/smarttable.component';
import { TimerComponent } from './timer/timer.component';



@NgModule({
  declarations: [SmarttableComponent, TimerComponent],
  imports: [
    CommonModule
  ],
  exports: [SmarttableComponent, TimerComponent]
})
export class SharedModule { }
