import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Aluno } from 'src/app/model/aluno';
import { EducatechService } from '../../services/educatech.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';

interface Escolaridade {
  name: string;
}


@Component({
  selector: 'cadastro-aluno',
  templateUrl: './cadastro-aluno.component.html',
  styleUrls: ['./cadastro-aluno.component.css']
})
export class CadastroAlunoComponent{

  passdefault = "Digite a senha";
  passweak = "Fraca";
  passmedium = "Média";
  passstrong = "Forte";


escolaridades: Escolaridade[];

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

escolaridadeSelecionada: Escolaridade = {name: ''};



    cadastrar(f: NgForm){
      const aluno: Aluno = {
        id: 0,
        nome: f.value.nome,
        email: f.value.email,
        senha: f.value.senha,
        telefone: f.value.telefone,    
        cpf: f.value.cpf,
        endereco: f.value.endereco,
        escolarizacao: this.escolaridadeSelecionada?.name,
      }
      this.educatechService.cadastrarAluno(aluno).subscribe(val => {
        if(!val)
          this.toastService.show('tc', 'error', 'Erro', 'Erro ao cadastrar, email já em uso.');
        else
          this.sucesso();  
      });
  
    }
  
    sucesso(){
      this.toastService.show('tc', 'success', 'Successo', 'Cadastro realizado com sucesso!' ); 
      this.router.navigate(['/login']);
    }


}