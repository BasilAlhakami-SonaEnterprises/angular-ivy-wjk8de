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

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getShipsTodayNexyDayCount().subscribe(data => {
      this.ShipsTodayNextDay = data.Count;
    });

    this.orderService.getShipsTodayOtherCount().subscribe(data => {
      this.ShipsTodayOther = data.Count;
    });

    this.orderService.getShipsLaterNextDayCount().subscribe(data => {
      this.ShipsLaterNextDay = data.Count;
    });

    this.orderService.getShipsLaterOtherCount().subscribe(data => {
      this.ShipsLaterOther = data.Count;
    });
  }
}
