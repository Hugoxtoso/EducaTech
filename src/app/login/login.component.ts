import { Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EducatechService } from '../services/educatech.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent { // implements OnInit

  constructor(private educatechService: EducatechService){}
  //sexo
  logar(f: NgForm){
   var user = this.educatechService.logar(f.value.email, f.value.senha)
   user.subscribe(penes => {
    if(penes.especializacao){
      console.log("penes professor");
    } else{ 
      console.log("penes aluno");
    }
   });
  }

}