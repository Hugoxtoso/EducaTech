import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrarProfessorEspecializacaoPipe'
})
export class FiltrarProfessorEspecializacaoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args || !args.length) {
      return value;
    }

    var especializacoes: any = [];
    args.forEach((el1: any) => {
        especializacoes.push(el1.especializacao.toLowerCase());
    });

    if(especializacoes.includes(value.toString().toLowerCase())){
        return value
    }
  }

}