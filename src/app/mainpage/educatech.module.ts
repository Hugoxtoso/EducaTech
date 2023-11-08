import { NgModule } from '@angular/core';
import { EducaTechComponent } from './educatech.component';
import { UserMainpageComponent } from './user-mainpage/user-mainpage.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimengModule } from '../shared/primeng.module';


@NgModule({
  declarations: [
    EducaTechComponent,
    UserMainpageComponent,
  ],
  exports:[
    EducaTechComponent,
  ],
  imports: [    
    BrowserModule,
    BrowserAnimationsModule,
    PrimengModule,
  ],
  providers: [],
  
  bootstrap: []
})
export class EducaTechModule { }
