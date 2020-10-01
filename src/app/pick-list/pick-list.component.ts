import { Component, OnInit } from "@angular/core";
import { OrderService } from "../services/order.service";

@Component({
  selector: "app-pick-list",
  templateUrl: "./pick-list.component.html",
  styleUrls: ["./pick-list.component.css"]
})
export class PickListComponent implements OnInit {
  ShipsTodayNextDay;
  ShipsTodayOther;
  ShipsLaterNextDay;
  ShipsLaterOther;
  ShipTodayNextDayLoading=false;
  ShipTodayOtherLoading=false;
  ShipLaterNextDayLoading=false;
  ShipsLaterOtherLoading=false;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.ShipTodayNextDayLoading=true;
    this.orderService.getShipsTodayNexyDayCount().subscribe(data => {
      this.ShipsTodayNextDay = data.Count;
      this.ShipTodayNextDayLoading=false;
    });
     this.ShipTodayOtherLoading=true;
    this.orderService.getShipsTodayOtherCount().subscribe(data => {
      this.ShipsTodayOther = data.Count;
      this.ShipTodayOtherLoading=false;
    });
      this.ShipLaterNextDayLoading=true;
    this.orderService.getShipsLaterNextDayCount().subscribe(data => {
      this.ShipsLaterNextDay = data.Count;
       this.ShipLaterNextDayLoading=false;
    });
    this.ShipsLaterOtherLoading=true;
    this.orderService.getShipsLaterOtherCount().subscribe(data => {
      this.ShipsLaterOther = data.Count;
          this.ShipsLaterOtherLoading=false;
    });
  }
    selectionClick(selection){
}
}
