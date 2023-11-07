import { NgModule } from '@angular/core';
import { PrimengModule } from '../shared/primeng.module';
import { NotUserNavBarComponent } from './notusernavbar/notuser-navbar.component';
import { AlunoNavBarComponent } from './alunonavbar/aluno-navbar.component';
import { ProfessorNavBarComponent } from './professornavbar/professor-navbar.component';






@NgModule({
  declarations: [
    NotUserNavBarComponent,
    AlunoNavBarComponent,
    ProfessorNavBarComponent
  ],
  exports:[
    NotUserNavBarComponent,
    AlunoNavBarComponent,
    ProfessorNavBarComponent
  ],
  imports: [
    PrimengModule,
  ],
  providers: [],
  
  bootstrap: []
})
export class NavBarModule { }
