import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

import { AppComponent } from './app.component';
import { PrimengModule } from '../primeng.module';
import { NavBarComponent } from '../../navbar/notusernavbar/notuser-navbar.component'
import {CadastroProfessorComponent} from '../../cadastro/cadastro-professor/cadastro-professor.component'
import {CadastroAlunoComponent} from '../../cadastro/cadastro-aluno/cadastro-aluno.component'
import {LoginComponent} from '../../login/login.component'
import {SobreComponent} from '../../sobre/sobre.component'
import {AlunoMainpageComponent} from '../../mainpage/user-mainpage/aluno-mainpage/aluno-mainpage.component'
import {  HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MessageService } from 'primeng/api';
import { ToastComponent } from '../toast/toast.component';







@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CadastroProfessorComponent,
    CadastroAlunoComponent,
    ToastComponent,
    LoginComponent,
    SobreComponent,
    AlunoMainpageComponent    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PrimengModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
