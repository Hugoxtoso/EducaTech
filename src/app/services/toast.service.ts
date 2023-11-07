import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

    constructor(private messageService: MessageService){}
  
    show(pos: string, sev: string, title: string, msg: string){
        this.messageService.add({ key: pos, severity: sev, summary: title, detail: msg })
    }

    clear(){
        this.messageService.clear();
    }
  
}
