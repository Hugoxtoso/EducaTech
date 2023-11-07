import { Component} from '@angular/core';




@Component({
  selector: 'professor-navbar',
  templateUrl: './professor-navbar.component.html',
  styleUrls: ['./professor-navbar.component.css']
})
export class ProfessorNavBarComponent{
  sidebarVisible: boolean = false;

}