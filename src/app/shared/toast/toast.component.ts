import { Component } from "@angular/core";
import { MessagesModule } from "primeng/messages";

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styles: [''],
    providers: [MessagesModule]
  })
  export class ToastComponent{
    
  
  }