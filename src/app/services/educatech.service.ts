import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Professor } from '../model/professor';
import { Aluno } from '../model/aluno';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EducatechService {
  private readonly APIPROF = 'api/professores';
  private readonly APIALUNO = 'api/alunos';
  private readonly APISHARED = 'api/shared';
  private usuarioLogado: User | null = null;

  
  constructor(private httpClient: HttpClient, private router: Router) { }

  //SHARED SERVICES INIT
  
  private readonly APISHAREDLogin = this.APISHARED + '/logar';
  logar(email: string, senha: string){
    console.log(email, senha);
    return this.httpClient.post<any>(this.APISHAREDLogin, {email, senha});
  }

  identificarUser(user: any){

    if((user as Professor).disponibilidade !== undefined){
      console.log("professor");
      return "professor";
    }

    if((user as Aluno).escolarizacao !== undefined){
      console.log("aluno");
      return "aluno";
    }
    console.log("nouser");
    return "nouser";

  }

  setUsuarioLogado(usuario: User) {
    this.usuarioLogado = usuario;
  }

  getUsuarioLogado(): User | null {
    return this.usuarioLogado;
  }

  logout() {
    //engual o leo
    this.usuarioLogado = null;
    this.router.navigate(['/login']);
  }

  //SHARED SERVICES END

  //PROFESSOR SERVICES INIT
  private readonly APIPROFlist = this.APIPROF+'/list';
  listarProfessores() {
    return this.httpClient.get<Professor[]>(this.APIPROFlist);
  }

  private readonly APIPROFCadastrar = this.APIPROF+'/cadastrar';
  cadastrarProfessor(prof: Professor) {
    return this.httpClient.post(this.APIPROFCadastrar, prof);
  }

  private readonly APIPROFBuscarID = this.APIPROF+'/buscarid';
  buscarProfessorporID(id: number){
    return this.httpClient.post(this.APIPROFBuscarID, id);
  }

  private readonly APIPROFEditar = this.APIPROF + '/editar';
  editarProfessor(professor: Professor){
    return this.httpClient.put(this.APIPROFEditar, professor);
  }

  //PROFESSOR SERVICES END

  //ALUNO SERVICES INIT
  private readonly APIALUNOCadastrar = this.APIALUNO + '/cadastrar';
  cadastrarAluno(aluno: Aluno){
    return this.httpClient.post(this.APIALUNOCadastrar, aluno);
  }

  private readonly APIALUNOBuscarID = this.APIALUNO+'/buscarid';
  buscarAlunoporID(id: number){
    return this.httpClient.post<Aluno>(this.APIALUNOBuscarID, id);
  }

  private readonly APIALUNOEditar = this.APIALUNO + '/editar';
  editarAluno(aluno: Aluno){
    return this.httpClient.put(this.APIALUNOEditar, aluno);
  }

  //ALUNO SERVICES END
  
}
