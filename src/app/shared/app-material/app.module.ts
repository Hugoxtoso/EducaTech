import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

import { AppComponent } from './app.component';
import { PrimengModule } from '../primeng.module';
import { CadastroProfessorComponent } from '../../cadastro/cadastro-professor/cadastro-professor.component'
import { CadastroAlunoComponent } from '../../cadastro/cadastro-aluno/cadastro-aluno.component'
import { LoginComponent } from '../../login/login.component'
import { SobreComponent } from '../../sobre/sobre.component'
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MessageService } from 'primeng/api';
import { ToastComponent } from '../toast/toast.component';
import { NavBarModule } from 'src/app/navbar/navbar.module';
import { AuthGuard } from 'src/app/services/auth-guard-service';
import { HomePageComponent } from 'src/app/homepage/homepage.component';
import { NotFoundComponent } from 'src/app/not-found/not-found.component';
import { CadastroComponent } from 'src/app/cadastro/cadastro.component';
import { EducaTechModule } from 'src/app/mainpage/educatech.module';
import { MeuperfilComponent } from 'src/app/mainpage/meuperfil/meuperfil.component';
import { MeuperfilAlunoComponent } from 'src/app/mainpage/meuperfil/meuperfil-aluno/meuperfil-aluno.component';
import { MeuperfilProfessorComponent } from 'src/app/mainpage/meuperfil/meuperfil-professor/meuperfil-professor.component';
import { ListaProfessoresComponent } from 'src/app/mainpage/lista-professores/lista-professores.component';
import { FiltrarProfessorNomePipe } from 'src/app/pipes/filtrarProfessorPipes/filtrarProfessorNome.pipe';
import { FiltrarProfessorTurnoPipe } from 'src/app/pipes/filtrarProfessorPipes/filtrarProfessorTurno.pipe';
import { FiltrarProfessorEspecializacaoPipe } from 'src/app/pipes/filtrarProfessorPipes/filtrarProfessorEspecializacao.pipe';
import { FiltrarProfessorRatingPipe } from 'src/app/pipes/filtrarProfessorPipes/filtrarProfessorRating.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    CadastroProfessorComponent,
    CadastroAlunoComponent,
    ToastComponent,
    LoginComponent,
    SobreComponent,
    HomePageComponent,
    CadastroComponent,
    MeuperfilComponent,
    MeuperfilAlunoComponent,
    MeuperfilProfessorComponent,
    ListaProfessoresComponent,
    FiltrarProfessorNomePipe,
    FiltrarProfessorTurnoPipe,
    FiltrarProfessorEspecializacaoPipe,
    FiltrarProfessorRatingPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PrimengModule,
    HttpClientModule,
    AppRoutingModule,
    NavBarModule,
    EducaTechModule
  ],
  providers: [MessageService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
