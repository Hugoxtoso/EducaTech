import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EducatechService } from 'src/app/services/educatech.service';
import { Contrato } from 'src/app/model/contrato';



@Component({
  selector: 'cadastro-contrato',
  templateUrl: './cadastro-contrato.component.html',
  styleUrls: ['./cadastro-contrato.component.css']
})
export class CadastroContratoComponent implements OnInit{
    nomeProfessor: string = '';
    idProfessor!: number;


    constructor(private educatechService: EducatechService, private toastService: ToastService, private router: Router, private route: ActivatedRoute){}

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.idProfessor = +params['id'];
            this.nomeProfessor = params['nome'];
        })
    }

    cadastrar(f: NgForm){
      const contrato: Contrato = {
        id: 0,
        titulo: f.value.titulo,
        valor: f.value.valor,
        descricao: f.value.descricao,
        id_professor: this.idProfessor,
        id_usuario: (this.educatechService.getUsuarioLogado()?.id as number),
        estado: "cadastradoByAluno",
        
      }
      this.educatechService.cadastrarContrato(contrato).subscribe(val => {
        if(!val)
          this.toastService.show('tc', 'error', 'Erro', 'Erro ao cadastrar!');
        else
          this.sucesso();
      });
  
    }
  
    sucesso(){
      this.toastService.show('tc', 'success', 'Successo', 'Cadastro realizado com sucesso!' ); 
      this.router.navigate(['/educatech']);
    }



}