import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtercategory'
})
export class FiltercategoryPipe implements PipeTransform {
  transform(value: any, category: string): any {
    const categoryArr = []
    if (category == '' || category == 'All') {
      return value
    } else {
      for (const item of value) {
        if (item.category == category) {
          categoryArr.push(item)
        }

      }
      return categoryArr
    }
  }
}
