import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrarContratoEstadosPipe'
})
export class FiltrarContratoEstadosPipe implements PipeTransform {

  transform(value: any, args?: any): any {    
    if (!value || !value.length || value === '' || !args || !args.length) {
      return value;
    }

    let estadosFiltro: any[] = [];
    args.forEach((el: any) => {
      estadosFiltro.push(el.label.toLowerCase());
    });

    if(estadosFiltro.includes(value.toLowerCase())){
        return value
    }
  }

}