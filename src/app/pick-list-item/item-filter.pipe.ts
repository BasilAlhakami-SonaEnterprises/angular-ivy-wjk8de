import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "itemFilter"
})
export class ItemFilterPipe implements PipeTransform {
  transform(dataItems: any[], filter: Object): any {
    if (!dataItems || !filter) {
      return dataItems;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return dataItems.filter(dataItem => dataItem.Item.indexOf(filter) !== -1);
  }
}
