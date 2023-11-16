import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrarProfessorRatingPipe'
})
export class FiltrarProfessorRatingPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    value = value as number;
    args = args as number;
    if (!args || !value) {
        if(args > 0){
            return value;
        }
        return true;
    }

    

    if(value >= args){
        return value
    }
  }

}