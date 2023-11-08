import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';




@Component({
  selector: 'notuser-navbar',
  templateUrl: './notuser-navbar.component.html',
  styleUrls: ['./notuser-navbar.component.css']
})
export class NotUserNavBarComponent implements OnInit{
  sidebarVisible2: boolean = false;

  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Como Professor',
        icon: 'pi pi-briefcase',
        routerLink: ['cadastro/professor']
      },
      {
        label: 'Como Aluno',
        icon: 'pi pi-user',
        routerLink: ['cadastro/aluno']
      }
    ];
}
}