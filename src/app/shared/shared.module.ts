import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmarttableComponent } from './smarttable/smarttable.component';



@NgModule({
  declarations: [SmarttableComponent],
  imports: [
    CommonModule
  ],
  exports: [SmarttableComponent]
})
export class SharedModule { }
