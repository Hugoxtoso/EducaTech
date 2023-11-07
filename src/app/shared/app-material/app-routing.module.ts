import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CadastroAlunoComponent } from "src/app/cadastro/cadastro-aluno/cadastro-aluno.component";
import { CadastroProfessorComponent } from "src/app/cadastro/cadastro-professor/cadastro-professor.component";
import { LoginComponent } from "src/app/login/login.component";
import { NotuserComponent } from "src/app/mainpage/notuser-mainpage/notuser-mainpage.component";


const appRoutes: Routes = [
    {path: '', redirectTo: '/notuser-mainpage', pathMatch: 'full'}, 
    {path: 'notuser-mainpage', component: NotuserComponent},
    {path: 'login', component: LoginComponent},
    {path: 'cadastro-aluno', component: CadastroAlunoComponent},
    {path: 'cadastro-professor', component: CadastroProfessorComponent},
    // {path: ':penis', component: LoginComponent},
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