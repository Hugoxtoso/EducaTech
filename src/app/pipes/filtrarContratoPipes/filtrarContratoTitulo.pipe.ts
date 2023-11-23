import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrarContratoTituloPipe'
})
export class FiltrarContratoTituloPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value || !value.length) {
      return value;
    }

    if(value.toLowerCase().includes(args.toLowerCase())){
        return value
    }
  }

}