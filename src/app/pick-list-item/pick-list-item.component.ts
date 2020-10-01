import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OrderService } from "../services/order.service";
@Component({
  selector: 'app-pick-list-item',
  templateUrl: './pick-list-item.component.html',
  styleUrls: ['./pick-list-item.component.css']
})
export class PickListItemComponent implements OnInit {
  columnsToDisplay = ["Code", "Qty"];

  data; // [{Code: "FS374", Qty: 13}, {Code: "DD312", Qty: 20}];
  selection;
  loading=false;
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selection = params["id"]; // (+) converts string 'id' to a number
      console.log(this.selection);
      this.loadList();
    });
  }

  loadList() {
    switch (this.selection) {
      case "ShipsTodayNextDay": {
        this.loadShipsTodayNextDayList();
        break;
      }
      case "ShipsTodayOther": {
        this.loadShipsTodayOtherList();
        break;
      }
      case "ShipsLaterNextDay": {
        this.loadShipsLaterNextDayList();
        break;
      }
      case "ShipsLaterOther": {
        this.loadShipsLaterOtherList();
        break;
      }
    }
  }

  loadShipsTodayNextDayList() {
    this.loading=true;
    this.orderService.getShipsTodayNextDayItemList().subscribe(data => {
         this.loading=false;
      console.log(data);
      this.data = data;
    });
  }

  loadShipsTodayOtherList() {
        this.loading=true;
    this.orderService.getShipsTodayOtherItemList().subscribe(data => {
        this.loading=false;
      console.log(data);
      this.data = data;
    });
  }

  loadShipsLaterNextDayList() {
        this.loading=true;
    this.orderService.getShipsLaterNextDayItemList().subscribe(data => {
              this.loading=false;
      console.log(data);
      this.data = data;
    });
  }

  loadShipsLaterOtherList() {
        this.loading=true;
    this.orderService.getShipsLaterOtherItemList().subscribe(data => {
              this.loading=false;
      console.log(data);
      this.data = data;
    });
  }
}

class Item {
  Code: string;
  Qty: number;
}