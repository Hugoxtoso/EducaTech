import { Component } from '@angular/core';
import { Professor } from '../../model/professor';
import { Observable } from 'rxjs';
import { EducatechService } from '../../services/educatech.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  
  // blobpenes!: string;
  
  professores: Observable<Professor[]>;

  constructor(private educatechService: EducatechService){
    this.professores = this.educatechService.listarProfessores()
    }


}


