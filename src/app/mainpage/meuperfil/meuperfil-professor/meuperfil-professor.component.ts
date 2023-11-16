import {Component, ViewChild, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Professor } from 'src/app/model/professor';
import { EducatechService } from 'src/app/services/educatech.service';
import { ToastService } from 'src/app/services/toast.service';



@Component({
  selector: 'meuperfil-professor',
  templateUrl: './meuperfil-professor.component.html',
  styleUrls: ['./meuperfil-professor.component.css']
})
export class MeuperfilProfessorComponent{


  selectedImagem: string = "";
  imageNotTouch: boolean = true;
  disableEditar = true;
  usuario: any = '';
  usuarioInicial: any = '';
  disponibilidade: string[] = [];
  

  constructor(public educatechService: EducatechService, private toastService: ToastService, private router: Router){}
  
  
  @ViewChild("selectbutton") selectbutton: any = {};

  async ngOnInit() {
    const usuarioLogado = this.educatechService.getUsuarioLogado();
    if (usuarioLogado) {
      const user = await this.educatechService.buscarProfessorporID(usuarioLogado.id).toPromise();
      this.usuario = user;
      this.usuarioInicial = {...user};
      this.selectedImagem = this.usuario.img;

         console.log(this.usuarioInicial.disponibilidade)

      if(this.usuarioInicial.disponibilidade.includes("manhã"))
        this.disponibilidade = this.disponibilidade.concat(['manhã']);
      if(this.usuarioInicial.disponibilidade.includes("tarde"))
      this.disponibilidade = this.disponibilidade.concat(['tarde']);
      if(this.usuarioInicial.disponibilidade.includes("noite"))
      this.disponibilidade = this.disponibilidade.concat(['noite']);
      
    }
  }
 

  editarform(form: any){
    if(!this.disableEditar){     
      this.usuario = {...this.usuarioInicial};
    }
    this.disableEditar = !this.disableEditar;
      
  }

    editar(f: NgForm){
      const professor: Professor = {
        id: (this.educatechService.getUsuarioLogado()?.id as number),
        nome: f.value.nome,
        email: f.value.email,
        senha: this.usuario.senha,
        faculdade: f.value.faculdade,
        especializacao: f.value.especializacao,
        disponibilidade: f.value.disponibilidade.toString(),
        telefone: f.value.telefone,    
        cpf: f.value.cpf,
        avaliacao: this.usuario.avaliacao,
        quantidadeavaliacao: this.usuario.quantidadeavaliacao,
        img: this.selectedImagem,
        
      }
      if(JSON.stringify(professor) == JSON.stringify(this.usuarioInicial)){
        this.toastService.clear();
        this.toastService.show('tc', 'error', 'Erro', 'Nenhum dado foi alterado!');
        return;
      }

      this.educatechService.editarProfessor(professor).subscribe(val => {
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

}


