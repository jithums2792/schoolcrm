import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketioService } from './services/socketio.service';
import { ToastrModule } from 'ngx-toastr';
import { DatepipePipe } from './pipes/datepipe.pipe';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';










@NgModule({
  declarations: [
    AppComponent,
    DatepipePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BsDatepickerModule.forRoot(),
    
  ],
  providers: [SocketioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
