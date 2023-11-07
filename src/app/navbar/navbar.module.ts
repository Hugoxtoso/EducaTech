import { NgModule } from '@angular/core';
import { PrimengModule } from '../shared/primeng.module';
import { SidebarModule } from 'primeng/sidebar';






@NgModule({
  declarations: [
  ],
  imports: [
    PrimengModule,
    SidebarModule
  ],
  providers: [],
  bootstrap: []
})
export class NavBarModule { }
