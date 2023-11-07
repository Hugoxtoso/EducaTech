import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Professor } from '../model/professor';
import { Aluno } from '../model/aluno';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EducatechService {
  private readonly APIPROF = 'api/professores';
  private readonly APIALUNO = 'api/alunos';
  private readonly APISHARED = 'api/shared';


  
  constructor(private httpClient: HttpClient) { }

  //SHARED SERVICES INIT
  private readonly APISHAREDLogin = this.APISHARED + '/logar';
  logar(email: string, senha: string){
    console.log(email, senha);
    return this.httpClient.post<any>(this.APISHAREDLogin, {email, senha});
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

  //PROFESSOR SERVICES END

  //ALUNO SERVICES INIT
  private readonly APIALUNOCadastrar = this.APIALUNO + '/cadastrar';
  cadastrarAluno(aluno: Aluno){
    return this.httpClient.post(this.APIALUNOCadastrar, aluno);
  }


  //ALUNO SERVICES END
  
}
