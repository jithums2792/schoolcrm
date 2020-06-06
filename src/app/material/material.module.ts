import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { MatListModule } from '@angular/material/';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule
  ],
  exports: [MatSidenavModule,
            MatButtonModule,
            MatToolbarModule,
            MatListModule,
            MatGridListModule,
            MatCardModule
          ]
})
export class MaterialModule { }
