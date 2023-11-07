import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';

interface Escolaridade {
  name: string;
  code: string;
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


escolaridades: Escolaridade[] | undefined;

    escolaridadeSelecionada: Escolaridade | undefined;

    ngOnInit() {
        this.escolaridades = [
            { name: 'Analfabeto', code: '0' },
            { name: 'Até 5º Ano Incompleto', code: '1' },
            { name: '5º Ano Completo', code: '2' },
            { name: '6º ao 9º Ano do Fundamental', code: '3' },
            { name: 'Médio Incompleto', code: '4' },
            { name: 'Médio Completo', code: '5' },
            { name: 'Superior Incompleto', code: '6' },
            { name: 'Superior Completo', code: '7' },
            { name: 'Mestrado', code: '8' },
            { name: 'Doutorado', code: '9' },
        ];
    }

    onSubmit(formCadAluno: NgForm){

    }


}