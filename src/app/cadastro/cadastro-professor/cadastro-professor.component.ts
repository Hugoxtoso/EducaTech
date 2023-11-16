import { NgForm } from '@angular/forms';
import { Professor } from './../../model/professor';
import { Component} from '@angular/core';
import { EducatechService } from '../../services/educatech.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'cadastro-professor',
  templateUrl: './cadastro-professor.component.html',
  styleUrls: ['./cadastro-professor.component.css'],
  providers: [MessageService]
})
export class CadastroProfessorComponent{

  constructor(private educatechService: EducatechService, private toastService: ToastService, private router: Router){}
 
    passdefault = "Digite a senha";
    passweak = "Fraca";
    passmedium = "Média";
    passstrong = "Forte";

    disponibilidade: any[] = [
      { name: 'manhã', value: "manhã" },
      { name: 'tarde', value: "tarde" },
      { name: 'noite', value: "noite" }
    ];

  selectedImagem: string = "";
  imageNotTouch: boolean = true;

  validarForm(f: NgForm) {
    if(!f.valid || this.imageNotTouch)
      return true;
    return false;
  }
  
  onSelect(event: any) {
      const file = event.target.files[0];
  
      if (file) {
        this.imageNotTouch = false;
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageBase64 = e.target?.result as "";
          this.base64ToImage(imageBase64);          
        };
        reader.readAsDataURL(file);
      }
  }

  base64ToImage(base64: "") {
    let str = base64.split(",")[1];
    this.selectedImagem = str;
  }

  cadastrar(f: NgForm){
    const prof: Professor = {
      id: 0,
      nome: f.value.nome,
      email: f.value.email,
      senha: f.value.senha,
      faculdade: f.value.faculdade,
      especializacao: f.value.especializacao,
      disponibilidade: f.value.disponibilidade.toString(),
      telefone: f.value.telefone,    
      cpf: f.value.cpf,
      img: this.selectedImagem,
      avaliacao: 0,
      quantidadeavaliacao: 0,
    }
    console.log(prof)
    this.educatechService.cadastrarProfessor(prof).subscribe(val => {
      if(!val)
        this.toastService.show('tc', 'error', 'Erro', 'Erro ao cadastrar, email já em uso.');
      else
        this.sucesso();

      console.log(val);
    });

  }

  sucesso(){
    this.toastService.show('tc', 'success', 'Successo', 'Cadastro realizado com sucesso!' ); 
    this.router.navigate(['/login']);
  }

}
