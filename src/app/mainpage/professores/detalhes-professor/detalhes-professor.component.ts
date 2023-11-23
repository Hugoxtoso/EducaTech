import {Component, ViewChild, } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EducatechService } from 'src/app/services/educatech.service';
import { ToastService } from 'src/app/services/toast.service';



@Component({
  selector: 'detalhes-professor',
  templateUrl: './detalhes-professor.component.html',
  styleUrls: ['./detalhes-professor.component.css']
})
export class DetalhesProfessorComponent{


  selectedImagem: string = "";
  imageNotTouch: boolean = true;
  disableEditar = true;
  usuario: any = '';
  usuarioInicial: any = '';
  disponibilidade: string[] = [];
  idProfessorSelecionado: number = 0;
  numerowpp: number = 0;
  

  constructor(public educatechService: EducatechService, private toastService: ToastService, private router: Router, private route: ActivatedRoute){}
  
  
  @ViewChild("selectbutton") selectbutton: any = {};

  async ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.idProfessorSelecionado = +params['id']
    })

    if (this.idProfessorSelecionado) {
      const user = await this.educatechService.buscarProfessorporID(this.idProfessorSelecionado).toPromise();
      this.usuario = user;
      this.usuarioInicial = {...user};
      this.selectedImagem = this.usuario.img;
      this.numerowpp = this.usuario.telefone.replace(/[^0-9]/g, "");

      if(this.usuarioInicial.disponibilidade.includes("manhã"))
        this.disponibilidade = this.disponibilidade.concat(['manhã']);
      if(this.usuarioInicial.disponibilidade.includes("tarde"))
      this.disponibilidade = this.disponibilidade.concat(['tarde']);
      if(this.usuarioInicial.disponibilidade.includes("noite"))
      this.disponibilidade = this.disponibilidade.concat(['noite']);
      
    }
  }
 

  base64ToImage(base64: "") {
    let str = base64.split(",")[1];
    this.selectedImagem = str;
  }

}


