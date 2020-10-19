import { Component, Input} from '@angular/core';

@Component({
  selector: 'line-item',
  templateUrl: './line-item.component.html',
  styleUrls: ['./line-item.component.css']
})
export class LineItemComponent  {

@Input() line: any;

}