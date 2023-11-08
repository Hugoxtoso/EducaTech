import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { EducatechService } from './educatech.service';


@Injectable()
export class AuthGuard {
    
    constructor(private educatechService: EducatechService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(!this.educatechService.getUsuarioLogado()){
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }

}