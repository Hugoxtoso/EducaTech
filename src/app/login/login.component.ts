import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EducatechService } from '../services/educatech.service';
import { User } from '../model/user';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  tipoUsuario!: string;

  constructor(private educatechService: EducatechService, private router: Router, private toastService: ToastService){}
  
  logar(f: NgForm){
   const response = this.educatechService.logar(f.value.email, f.value.senha)
   response.subscribe(user => {
    this.tipoUsuario = this.educatechService.identificarUser(user);
    this.redirectUser(this.tipoUsuario, user);
   });
  }

  async createUser(user: any, type: string){
      const novoUser: User = {
        id: user.id,
        tipo: type
      }
      this.educatechService.setUsuarioLogado(novoUser);

      let userForName: any;
      if(novoUser.tipo == 'professor'){
        const user = await this.educatechService.buscarProfessorporID(novoUser.id).toPromise();
        userForName = user;
        
      }
      if(novoUser.tipo == 'aluno'){
        const user = await this.educatechService.buscarAlunoporID(novoUser.id).toPromise();
        userForName = user;
      }
      this.educatechService.setUserName(userForName.nome)
    }
     

  redirectUser(tipo: string, user: any){
    if(tipo === "nouser"){
      this.toastService.show('tc', 'error', 'Não foi possível logar', 'Usuário/Senha incorretos.' ); 
      return;
    }

    this.router.navigate(['/educatech']);
    this.createUser(user, this.tipoUsuario);
    this.toastService.show('tc', 'success', 'Bem Vindo, '+ user.nome, 'Login realizado com sucesso!' ); 
  }

}