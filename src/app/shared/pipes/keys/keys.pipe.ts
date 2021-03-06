import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const keys: string[] = [];
    for (const key in value) {
      keys.push(key);
    }
    return keys;
  }

}
