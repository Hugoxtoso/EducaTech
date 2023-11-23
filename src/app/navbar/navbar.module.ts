import { NgModule } from '@angular/core';
import { PrimengModule } from '../shared/primeng.module';
import { NotUserNavBarComponent } from './notusernavbar/notuser-navbar.component';
import { UserNavBarComponent } from './usernavbar/user-navbar.component';
import { NavbarComponent } from './navbar.component';
//eu quem fiz leo sexo
@NgModule({
  declarations: [
    NavbarComponent,
    NotUserNavBarComponent,
    UserNavBarComponent
  ],
  exports:[
    NavbarComponent,
  ],
  imports: [
    PrimengModule,
  ],
  providers: [],
  
  bootstrap: []
})
export class NavBarModule { }
