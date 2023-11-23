import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EducatechService } from 'src/app/services/educatech.service';


@Component({
  selector: 'lista-professores',
  templateUrl: './lista-professores.component.html',
  styleUrls: ['./lista-professores.component.css'],
  
})
export class ListaProfessoresComponent implements OnInit{

  constructor(public educatechService: EducatechService){}

  professores: any = [];

  especializacoes: any = [];

  disponibilidades: any[] = [
    'manhã',
    'tarde',
    'noite'
  ];

  disponibilidadeFilter: any = [];
  especializacaoFilter: any = [];
  ratingFilter: number = 0;

  @ViewChild('nomeFilter') nomeFilter: any = '';

  ngOnInit(){
    this.educatechService.listarProfessores().subscribe(response => {
      this.professores = response;
      this.createListEspecializacao(this.professores);
      for(let i = 0; i < this.professores.length; i++){
        this.professores[i].disponibilidade = this.professores[i].disponibilidade.split(',');        
      }
      this.professores.sort((a: { avaliacao: number; },b: { avaliacao: number; }) => b.avaliacao - a.avaliacao);
    });      
  }

  createListEspecializacao(profs: any){
    const especializacaoCount = new Map<string, number>();
    for (const professor of profs) {
      const especializacao = professor.especializacao;
      if (!especializacaoCount.has(especializacao)) {
        especializacaoCount.set(especializacao, 0);
      }
      especializacaoCount.set(especializacao, especializacaoCount.get(especializacao)! + 1);
    }
    this.especializacoes = Array.from(especializacaoCount.entries()).map(([especializacao, cont]) => {
      const label = especializacao + ' (' + cont + ')';
      return { especializacao, cont, label };
    });
    this.especializacoes.sort((a: { cont: number; },b: { cont: number; }) => b.cont - a.cont);
  }

  getSeverity(disp: any) {
    switch (disp) {
        case 'manhã':
            return 'success';
        case 'tarde':
            return 'warning';
        case 'noite':
            return 'secondary';
        default:
          return;
    }
};

limparFiltros(){
  this.nomeFilter.nativeElement.value = "";
  this.disponibilidadeFilter = [];
  this.especializacaoFilter = [];
  this.ratingFilter = 0;
  
}
  

}


