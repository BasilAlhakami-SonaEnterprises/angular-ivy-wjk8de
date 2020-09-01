import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pick-list-item',
  templateUrl: './pick-list-item.component.html',
  styleUrls: ['./pick-list-item.component.css']
})
export class PickListItemComponent implements OnInit {

  columnsToDisplay = ['Code', 'Qty'];

  data =  [{Code: "FS374", Qty: 13}, {Code: "DD312", Qty: 20}];


  constructor() { }

  ngOnInit() {
  }

}

class Item{
  Code : string;
  Qty: number;


}