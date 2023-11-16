import { Aluno } from './../../../model/aluno';
import { Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { EducatechService } from 'src/app/services/educatech.service';

interface Escolaridade {
  name: string;
}


@Component({
  selector: 'meuperfil-aluno',
  templateUrl: './meuperfil-aluno.component.html',
  styleUrls: ['./meuperfil-aluno.component.css']
})
export class MeuperfilAlunoComponent implements OnInit{

  disableEditar = false;
  escolaridades: Escolaridade[];
  id: number = 0;
  
  usuario: any = '';
  usuarioInicial: any = '';
  
  @ViewChild("dropdown") dropdown: any = {};
  

  async ngOnInit() {
    const usuarioLogado = this.educatechService.getUsuarioLogado();
    if (usuarioLogado) {
      const user = await this.educatechService.buscarAlunoporID(usuarioLogado.id).toPromise();
      this.usuario = user;
      this.usuarioInicial = {...user};
      this.dropdown.selectedOption = {name: user?.escolarizacao};
      this.disableEditar = true;
    }
  }
 
  constructor(private educatechService: EducatechService, private toastService: ToastService, private router: Router){
    this.escolaridades = [
      { name: 'Analfabeto'},
      { name: 'Até 5º Ano Incompleto'},
      { name: '5º Ano Completo'},
      { name: '6º ao 9º Ano do Fundamental'},
      { name: 'Médio Incompleto'},
      { name: 'Médio Completo'},
      { name: 'Superior Incompleto'},
      { name: 'Superior Completo'},
      { name: 'Mestrado'},
      { name: 'Doutorado'},
    ];
  }

    editarform(form: any){
      if(!this.disableEditar){     
        this.usuario = {...this.usuarioInicial};
        console.log(this.usuario.escolarizacao)
      }
      this.disableEditar = !this.disableEditar;
        
    }

    editar(f: NgForm){
      const aluno: Aluno = {
        id: (this.educatechService.getUsuarioLogado()?.id as number),
        nome: f.value.nome,
        email: f.value.email,
        senha: this.usuario.senha,
        telefone: f.value.telefone,    
        cpf: f.value.cpf,
        escolarizacao: this.dropdown.selectedOption.name,
        endereco: f.value.endereco,
      }
      if(JSON.stringify(aluno) == JSON.stringify(this.usuarioInicial)){
        this.toastService.clear();
        this.toastService.show('tc', 'error', 'Erro', 'Nenhum dado foi alterado!');
        return;
      }

      this.educatechService.editarAluno(aluno).subscribe(val => {
        if(!val)
          this.toastService.show('tc', 'error', 'Erro', 'Erro ao Editar, email já em uso.');
        else
          this.sucesso();
      });
    }
  
    sucesso(){
      this.toastService.show('tc', 'success', 'Successo', 'Seu perfil foi editado!' ); 
      this.router.navigate(['/educatech']);
    }



}