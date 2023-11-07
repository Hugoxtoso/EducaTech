import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Professor } from '../model/professor';

@Injectable({
  providedIn: 'root'
})
export class EducatechService {
  private readonly APIPROF = 'api/professores';

  
  constructor(private httpClient: HttpClient) { }



  
  private readonly APIPROFlist = this.APIPROF+'/list';
  listarProfessores() {
    return this.httpClient.get<Professor[]>(this.APIPROFlist)
  }

  private readonly APIPROFCadastrar = this.APIPROF+'/cadastrar';
  cadastrarProfessor(prof: Professor) {
    return this.httpClient.post(this.APIPROFCadastrar, prof)
  }
  
}
