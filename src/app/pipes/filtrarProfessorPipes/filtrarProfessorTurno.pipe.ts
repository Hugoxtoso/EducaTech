import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrarProfessorTurnoPipe'
})
export class FiltrarProfessorTurnoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args || !args.length) {
      return value;
    }
    value.sort();
    args.sort();
    var isEqual: any = null;
    //let him cock
    //COOK*
    for(const elem1 of args){
        if(!value.includes(elem1)){
            isEqual = false;
            break;
        }
        isEqual = true; 
    }
    
    if(isEqual){
        return value;
    }
  }

}