import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datepipe'
})
export class DatepipePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value.substring(0,10)
  }

}
