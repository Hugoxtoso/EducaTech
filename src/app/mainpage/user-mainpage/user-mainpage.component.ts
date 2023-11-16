import {Component, } from '@angular/core';
import { EducatechService } from 'src/app/services/educatech.service';



@Component({
  selector: 'user-mainpage',
  templateUrl: './user-mainpage.component.html',
  styleUrls: ['./user-mainpage.component.css']
})
export class UserMainpageComponent{

  constructor(public educatechService: EducatechService){}

}


