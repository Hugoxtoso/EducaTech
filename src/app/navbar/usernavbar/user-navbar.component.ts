import { Component} from '@angular/core';
import { EducatechService } from 'src/app/services/educatech.service';




@Component({
  selector: 'user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavBarComponent{
  sidebarVisible: boolean = false;

  constructor(public educatechService: EducatechService){}

}