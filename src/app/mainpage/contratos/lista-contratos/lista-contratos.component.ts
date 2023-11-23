import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/model/user';
import { EducatechService } from 'src/app/services/educatech.service';


@Component({
  selector: 'lista-contratos',
  templateUrl: './lista-contratos.component.html',
  styleUrls: ['./lista-contratos.component.css'],
  
})
export class ListarContratosComponent implements OnInit{

  constructor(public educatechService: EducatechService){}

  contratos: any = [];

  filtroTitulo: string = '';
  filtroAlunos: any = '';
  filtroProfessores: any = '';
  filtroEstado: any;

  listaProfessores: any;
  listaAlunos: any;
  listaEstados: any = [
    { label: 'Novo', ordem: 0 },
    { label: 'Em Andamento', ordem: 1 },
    { label: 'Contraproposta Recebida', ordem: 2 },
    { label: 'Finalizado pelo Professor, Confirmação Pendente', ordem: 3 },
    { label: 'Finalizado pelo Aluno, Confirmação Pendente', ordem: 4 },
    { label: 'Pendente', ordem: 5 },
    { label: 'Contraproposta Pendente', ordem: 6 },
    { label: 'Aguardando Confirmação de Professor para Finalizar', ordem: 7 },
    { label: 'Aguardando Confirmação de Aluno para Finalizar', ordem: 8 },
    { label: 'Finalizado', ordem: 9 },
    { label: 'Avaliado', ordem: 10 },
  ]

  ngOnInit(){
    this.listaAlunos = [];
    this.listaProfessores = [];
    //macaco n sabe dar nome
    this.educatechService.listarContratosPorId(this.educatechService.getUsuarioLogado() as User).subscribe(response => {
      this.contratos = response;
      for(let i = 0; i < this.contratos.length; i++){
        this.contratos[i].estado = this.formatEstado(this.contratos[i].estado);                
      }
      this.contratos.sort((a: any, b: any) => a.estado.ordem - b.estado.ordem);
      this.buscarNomeAlunos();
      this.buscarNomeProfessores();
    });      
  }

  buscarNomeProfessores(){
    for(let i = 0; i < this.contratos.length; i++){
      this.educatechService.buscarProfessorporID(this.contratos[i].id_professor).subscribe((response: any) => {
        this.contratos[i].nomeProfessor = response.nome;
        if(this.listaProfessores.find((prof: any) => prof.label === response.nome) === undefined)
          this.listaProfessores.push({label: response.nome});
      }) 
    }
  }

  buscarNomeAlunos(){
    for(let i = 0; i < this.contratos.length; i++){
      this.educatechService.buscarAlunoporID(this.contratos[i].id_usuario).subscribe((response: any) => {
        this.contratos[i].nomeAluno = response.nome;
        if(this.listaAlunos.find((aluno: any) => aluno.label === response.nome) === undefined)
          this.listaAlunos.push({label: response.nome});
      })
    }
  }

  formatEstado(estado: string){
    let newObj: any;
    let estadoFormato = this.getEstado(estado);

    newObj = this.listaEstados.find((estado: any) => estado.label == estadoFormato);
    newObj.severidade = this.getSeverity(estado);
    
    return newObj;
  }

  getSeverity(disp: any) {
    if(this.educatechService.getUsuarioLogado()?.tipo === 'aluno'){
      switch (disp) {
        case 'cadastradoByAluno':
            return '#02bdb0';
        case 'propostaAluno':
            return '#02bd85';
        case 'propostaProfessor':
            return '#0266bd';
        case 'aceito':
              return '#02bd37';
        case 'finalizadoAluno':
              return '#a102bd';
        case 'finalizadoProfessor':
              return '#bd026c';
        case 'finalizado':
            return '#000';
        case 'avaliado':
            return '#6202bd';
        default:
          return;
      }
    }
    if(this.educatechService.getUsuarioLogado()?.tipo === 'professor'){
      switch (disp) {
        case 'cadastradoByAluno':
            return '#028bbd';
        case 'propostaAluno':
            return '#0266bd';
        case 'propostaProfessor':
            return '#02bd85';
        case 'aceito':
            return '#02bd37';
        case 'finalizadoAluno':
            return '#bd026c';
        case 'finalizadoProfessor':
            return '#a102bd';
        case 'finalizado':
            return '#000';
        case 'avaliado':
            return '#6202bd';
        default:
          return;
      }
    }
    return 'bugou legal';

  };

  getEstado(disp: any) {
    if(this.educatechService.getUsuarioLogado()?.tipo === 'aluno'){
      switch (disp) {
        case 'cadastradoByAluno':
            return 'Pendente';
        case 'propostaAluno':
            return 'Contraproposta Pendente';
        case 'propostaProfessor':
            return 'Contraproposta Recebida';
        case 'aceito':
            return 'Em Andamento';
        case 'finalizadoAluno':
            return 'Aguardando Confirmação de Professor para Finalizar';
        case 'finalizadoProfessor':
            return 'Finalizado pelo Professor, Confirmação Pendente';
        case 'finalizado':
            return 'Finalizado';
        case 'avaliado':
            return 'Avaliado';
        default:
          return;
      }
    }
    if(this.educatechService.getUsuarioLogado()?.tipo === 'professor'){
      switch (disp) {
        case 'cadastradoByAluno':
            return 'Novo';
        case 'propostaAluno':
            return 'Contraproposta Recebida';
        case 'propostaProfessor':
            return 'Contraproposta Pendente';
        case 'aceito':
            return 'Em Andamento';
        case 'finalizadoAluno':
              return 'Finalizado pelo Aluno, Confirmação Pendente';
        case 'finalizadoProfessor':
              return 'Aguardando Confirmação de Aluno para Finalizar';
        case 'finalizado':
            return 'Finalizado';
        case 'avaliado':
            return 'Avaliado';
        default:
          return;
      }
    }
    return 'bugou legal';

  };

  getTextoBotaoDetalhes(disp: any) {

    if(this.educatechService.getUsuarioLogado()?.tipo === 'aluno'){
      if(disp == 'Finalizado')
        return 'Avaliar';
      else {
        return 'Detalhes';
      }
    }
    if(this.educatechService.getUsuarioLogado()?.tipo === 'professor'){
      return 'Detalhes'
    }
    return 'bugou legal';

  };

  getSeverityBotaoDetalhes(disp: any) {

    if(this.educatechService.getUsuarioLogado()?.tipo === 'aluno'){
      if(disp == 'Finalizado')
        return 'success';
      else {
        return 'primary';
      }
    }
    if(this.educatechService.getUsuarioLogado()?.tipo === 'professor'){
      return 'primary';
    }
    return 'bugou legal';

  };
  
  limparFiltros(){
    this.filtroTitulo = "";
    this.filtroAlunos = [];
    this.filtroProfessores = [];
    this.filtroEstado = [];
    
  }


}


