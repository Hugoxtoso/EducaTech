import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrarContratoIntegrantesPipe'
})
export class FiltrarContratoIntegrantesPipe implements PipeTransform {

  transform(value: any, args?: any): any {    
    if (!value || !value.length || value === '' || !args || !args.length) {
      return value;
    }

    let professoresFiltro: any[] = [];
    args.forEach((el: any) => {
        professoresFiltro.push(el.label.toLowerCase());
    });

    if(professoresFiltro.includes(value.toLowerCase())){
        return value
    }
  }

}