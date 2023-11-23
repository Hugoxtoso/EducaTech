import {Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contrato } from 'src/app/model/contrato';
import { Professor } from 'src/app/model/professor';
import { EducatechService } from 'src/app/services/educatech.service';
import { ToastService } from 'src/app/services/toast.service';



@Component({
  selector: 'detalhes-contrato',
  templateUrl: './detalhes-contrato.component.html',
  styleUrls: ['./detalhes-contrato.component.css']
})
export class DetalhesContratoComponent{

  disableEditar = true;
  idContratoSelecionado: number = 0;
  contrato: any = '';
  contratoInicial: any = '';
  alunoContrato: any = '';
  professorContrato: any = '';
  textoEditarContrato: string = '';
  estadoContrato: string = '';
  podeEditar = false;
  podeAceitar = false;
  podeFinalizar = false;
  podeAvaliar = false;
  tagContrato: string = '';

  valueAvaliacao = 0;
  

  constructor(public educatechService: EducatechService, private toastService: ToastService, private router: Router, private route: ActivatedRoute){}


  async ngOnInit() {

    this.route.params.subscribe((params: Params) => {
        this.idContratoSelecionado = +params['id'];
        this.tagContrato = params['tag'];
    })

    if (this.idContratoSelecionado) {
        const contrato = await this.educatechService.buscarContratoporID(this.idContratoSelecionado).toPromise();
        this.contrato = contrato;
        this.contratoInicial = {...contrato};
        this.professorContrato = await this.educatechService.buscarProfessorporID(this.contrato.id_professor).toPromise();
        this.alunoContrato = await this.educatechService.buscarAlunoporID(this.contrato.id_usuario).toPromise();
    }

    if(this.educatechService.getUsuarioLogado()?.tipo == 'professor')
      this.textoEditarContrato = "Propor contraproposta";
    if(this.educatechService.getUsuarioLogado()?.tipo == 'aluno')
      this.textoEditarContrato = "Editar proposta";

    if(this.educatechService.getUsuarioLogado()?.tipo == 'professor')
      this.estadoContrato = "propostaProfessor";
    if(this.educatechService.getUsuarioLogado()?.tipo == 'aluno')
      this.estadoContrato = "propostaAluno";


    if(this.educatechService.getUsuarioLogado()?.tipo == 'professor'){
      if(this.contrato.estado == 'cadastradoByAluno' || this.contrato.estado == 'propostaAluno')
        this.podeAceitar = true;
      if(this.contrato.estado == 'cadastradoByAluno' || this.contrato.estado == 'propostaAluno' || this.contrato.estado == 'propostaProfessor')
        this.podeEditar = true;
      if(this.contrato.estado == 'aceito' || this.contrato.estado == 'finalizadoAluno')
        this.podeFinalizar = true;
    }

    if(this.educatechService.getUsuarioLogado()?.tipo == 'aluno'){
      if(this.contrato.estado == 'propostaProfessor')
        this.podeAceitar = true;
      if(this.contrato.estado == 'cadastradoByAluno' || this.contrato.estado == 'propostaAluno' || this.contrato.estado == 'propostaProfessor')
        this.podeEditar = true;
      if(this.contrato.estado == 'aceito' || this.contrato.estado == 'finalizadoProfessor')
        this.podeFinalizar = true;
      if(this.contrato.estado == 'finalizado')
        this.podeAvaliar = true;
    }
      
  }

  editar(f: NgForm){
    const contrato: Contrato = {
      id: this.contratoInicial.id,
      descricao: f.value.descricao,
      titulo: f.value.titulo,
      valor: f.value.valor,
      estado: this.estadoContrato,
      id_professor: this.contratoInicial.id_professor,
      id_usuario: this.contratoInicial.id_usuario,
     
    }
    if( contrato.descricao == this.contratoInicial.descricao && contrato.titulo == this.contratoInicial.titulo && contrato.valor == this.contratoInicial.valor){
      this.toastService.clear();
      this.toastService.show('tc', 'error', 'Erro', 'Nenhum dado foi alterado!');
      return;
    }

    this.educatechService.editarContrato(contrato).subscribe(val => {
      if(!val)
        this.toastService.show('tc', 'error', 'Erro', 'Erro ao Editar!');
      else
        this.toastEditar();
    });
  }

  toastEditar(){
    this.toastService.show('tc', 'success', 'Successo', 'Seu serviço foi editado!' ); 
    this.router.navigate(['/educatech/servicos/lista']);
  }
 

  editarform(form: any){
    if(!this.disableEditar){     
      this.contrato = {...this.contratoInicial};
    }
    this.disableEditar = !this.disableEditar;
      
  }

  aceitarContrato(){
    const contrato: Contrato = {
      id: this.contratoInicial.id,
      descricao: this.contratoInicial.descricao,
      titulo: this.contratoInicial.titulo,
      valor: this.contratoInicial.valor,
      estado: 'aceito',
      id_professor: this.contratoInicial.id_professor,
      id_usuario: this.contratoInicial.id_usuario,
     
    }

    this.educatechService.editarContrato(contrato).subscribe(val => {
      if(!val)
        this.toastService.show('tc', 'error', 'Erro', 'Erro ao Aceitar Serviço!');
      else
        this.toastAceitar();
    });
  }

  toastAceitar(){
    this.toastService.show('tc', 'success', 'Successo', 'Serviço Aceito!' ); 
    this.router.navigate(['/educatech/servicos/lista']);
  }

  finalizarContrato(){

    let estadoContrato = '';
    if(this.educatechService.getUsuarioLogado()?.tipo == 'professor'){
      if(this.contratoInicial.estado == 'aceito')
        estadoContrato = 'finalizadoProfessor';
      if(this.contratoInicial.estado == 'finalizadoAluno')
        estadoContrato = 'finalizado';
    }
    if(this.educatechService.getUsuarioLogado()?.tipo == 'aluno'){
      if(this.contratoInicial.estado == 'aceito')
        estadoContrato = 'finalizadoAluno';
      if(this.contratoInicial.estado == 'finalizadoProfessor')
        estadoContrato = 'finalizado';
    }

    const contrato: Contrato = {
      id: this.contratoInicial.id,
      descricao: this.contratoInicial.descricao,
      titulo: this.contratoInicial.titulo,
      valor: this.contratoInicial.valor,
      estado: estadoContrato,
      id_professor: this.contratoInicial.id_professor,
      id_usuario: this.contratoInicial.id_usuario,
     
    }

    this.educatechService.editarContrato(contrato).subscribe(val => {
      if(!val)
        this.toastService.show('tc', 'error', 'Erro', 'Erro ao Finalizar Serviço!');
      else
        this.toastFinalizar();
    });
  }
  toastFinalizar(){
    this.toastService.show('tc', 'success', 'Successo', 'Serviço Finalizado!' ); 
    this.router.navigate(['/educatech/servicos/lista']);
  }

  avaliar(){
    let avaliacaoAntiga: number = this.professorContrato.avaliacao;
    let quantidadeAvaliacaoAntiga: number = this.professorContrato.quantidadeavaliacao;

    let quantidadeAvaliacaoNova: number = quantidadeAvaliacaoAntiga + 1;
    let avaliacaoNova: number = (avaliacaoAntiga + this.valueAvaliacao) / quantidadeAvaliacaoNova;

    const professor: Professor = {
      id: this.professorContrato.id,
      nome: this.professorContrato.nome,
      email: this.professorContrato.email,
      senha: this.professorContrato.senha,
      faculdade: this.professorContrato.faculdade,
      especializacao: this.professorContrato.especializacao,
      disponibilidade: this.professorContrato.disponibilidade,
      telefone: this.professorContrato.telefone,    
      cpf: this.professorContrato.cpf,
      avaliacao: avaliacaoNova,
      quantidadeavaliacao: quantidadeAvaliacaoNova,
      img: this.professorContrato.img,
      
    }

    const contrato: Contrato = {
      id: this.contratoInicial.id,
      descricao: this.contratoInicial.descricao,
      titulo: this.contratoInicial.titulo,
      valor: this.contratoInicial.valor,
      estado: "avaliado",
      id_professor: this.contratoInicial.id_professor,
      id_usuario: this.contratoInicial.id_usuario,
     
    }
    this.educatechService.editarContrato(contrato).subscribe(val => {
      //
    });

    this.educatechService.editarProfessor(professor).subscribe(val => {
      if(!val)
        this.toastService.show('tc', 'error', 'Erro', 'Erro ao Avaliar');
      else
        this.toastAvaliar();
    });
  }
  toastAvaliar(){
    this.toastService.show('tc', 'success', 'Successo', 'Serviço Avaliado!' ); 
    this.router.navigate(['/educatech/servicos/lista']);
  }

}


