import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, price: string): any {
    const priceArr = []
    if (Number(price) == 0) {
      return value
    } else {
      for (const item of value) {
        if (item.price < Number(price) + 10 && item.price > Number(price) - 10) {
          priceArr.push(item)
        }
      }
      return priceArr

    }
  }
}
