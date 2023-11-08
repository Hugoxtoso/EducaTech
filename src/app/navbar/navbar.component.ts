
import { Component } from "@angular/core";
import { EducatechService } from "../services/educatech.service";

@Component({
    selector: 'navbar-root',
    templateUrl: './navbar.component.html',
    styles: ['']
  })
  export class NavbarComponent{
    
    constructor(public educatechService: EducatechService){}
  
  }