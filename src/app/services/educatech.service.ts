import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Professor } from '../model/professor';
import { Aluno } from '../model/aluno';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { Contrato } from '../model/contrato';

@Injectable({
  providedIn: 'root'
})
export class EducatechService {
  private readonly APIPROF = 'api/professores';
  private readonly APIALUNO = 'api/alunos';
  private readonly APISHARED = 'api/shared';
  private readonly APICONTRATO = 'api/contrato';
  private usuarioLogado: User | null = null;
  private userName: string | null = null;

  
  constructor(private httpClient: HttpClient, private router: Router) { }

  //SHARED SERVICES INIT
  
  private readonly APISHAREDLogin = this.APISHARED + '/logar';
  logar(email: string, senha: string){
    return this.httpClient.post<any>(this.APISHAREDLogin, {email, senha});
  }

  identificarUser(user: any){

    if((user as Professor).disponibilidade !== undefined){
      return "professor";
    }

    if((user as Aluno).escolarizacao !== undefined){
      return "aluno";
    }
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

  getUserName() {
    return this.userName;
  }

  setUserName(name: string){
    this.userName = name;
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

  private readonly APIALUNOBuscarID = this.APIALUNO +'/buscarid';
  buscarAlunoporID(id: number){
    return this.httpClient.post(this.APIALUNOBuscarID, id);
  }

  private readonly APIALUNOEditar = this.APIALUNO + '/editar';
  editarAluno(aluno: Aluno){
    return this.httpClient.put(this.APIALUNOEditar, aluno);
  }

  //ALUNO SERVICES END

  //CONTRATO SERVICES INIT

  private readonly APICONTRATOListarPorId = this.APICONTRATO + '/listarPorId'
  listarContratosPorId(user: User){
    return this.httpClient.post<Contrato[]>(this.APICONTRATOListarPorId, user);
  }

  private readonly APICONTRATOCadastrar = this.APICONTRATO + '/cadastrar'
  cadastrarContrato(contrato: Contrato){
    return this.httpClient.post(this.APICONTRATOCadastrar, contrato);
  }

  private readonly APICONTRATOEditar = this.APICONTRATO + '/editar'
  editarContrato(contrato: Contrato){
    return this.httpClient.put(this.APICONTRATOEditar, contrato);
  }

  private readonly APICONTRATOBuscarID = this.APICONTRATO+'/buscarid';
  buscarContratoporID(id: number){
    return this.httpClient.post<Contrato>(this.APICONTRATOBuscarID, id);
  }

  //CONTRATO SERVICES END
  
}
