import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CadastroAlunoComponent } from "src/app/cadastro/cadastro-aluno/cadastro-aluno.component";
import { CadastroProfessorComponent } from "src/app/cadastro/cadastro-professor/cadastro-professor.component";
import { CadastroComponent } from "src/app/cadastro/cadastro.component";
import { LoginComponent } from "src/app/login/login.component";
import { EducaTechComponent } from "src/app/mainpage/educatech.component";
import { HomePageComponent } from "src/app/homepage/homepage.component";
import { UserMainpageComponent } from "src/app/mainpage/user-mainpage/user-mainpage.component";
import { NotFoundComponent } from "src/app/not-found/not-found.component";
import { AuthGuard } from "src/app/services/auth-guard-service";
import { MeuperfilComponent } from "src/app/mainpage/meuperfil/meuperfil.component";
import { MeuperfilAlunoComponent } from "src/app/mainpage/meuperfil/meuperfil-aluno/meuperfil-aluno.component";
import { MeuperfilProfessorComponent } from "src/app/mainpage/meuperfil/meuperfil-professor/meuperfil-professor.component";
import { ListaProfessoresComponent } from "src/app/mainpage/lista-professores/lista-professores.component";


const appRoutes: Routes = [ 
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomePageComponent},
    {path: 'login', component: LoginComponent},
    {path: 'cadastro', component: CadastroComponent, children: [
        {path: 'aluno', component: CadastroAlunoComponent},
        {path: 'professor', component: CadastroProfessorComponent},
        {path: '', redirectTo: '/home', pathMatch: 'full'},
    ]},
    {path: 'educatech', component: EducaTechComponent, canActivate: [AuthGuard], children: [
        {path: '', component: UserMainpageComponent},
        {path: 'meuperfil', component: MeuperfilComponent, children:[
            {path: 'aluno', component: MeuperfilAlunoComponent},
            {path: 'professor', component: MeuperfilProfessorComponent},
            {path: '', redirectTo: '/educatech', pathMatch: 'full'},
        ]},
        {path: 'professores', component: ListaProfessoresComponent},
        //model children: {path: 'sexo', component: SexoComponent},
    ]},
    {path: '**', component: NotFoundComponent},
    //model: {path: ':penis', component: PenisComponent, canActivate: [AuthGuard]},
];


@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}