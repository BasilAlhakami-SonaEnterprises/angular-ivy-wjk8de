import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OrderService } from "../services/order.service";

@Component({
  selector: 'app-item-picking',
  templateUrl: './item-picking.component.html',
  styleUrls: ['./item-picking.component.css']
})
export class ItemPickingComponent implements OnInit {
selection;
  item = "Hit next to start.";
  qty = "";
  lines = [{ Item: "Hit next to start" }];
  poNumber = "";
  shipMethod = "";
  trackingNumber = "";
  shippingDate  = "";
  printer = "";


  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selection = params["selection"]; // (+) converts string 'id' to a number
      this.item = params["item"];
      console.log(this.selection);
      console.log(this.item);
    });
  }

  nextClick() {
    console.log(this.printer);
    this.orderService
      .getItemLabel(this.selection, this.item, this.printer)
      .subscribe(data => {
        if (data == "we have no labels to print") {

           console.log("No data.");

        } else {
          console.log(data);
          this.PONumber = 
          this.qty = data.QTY;
          this.lines = data.Lines;
          this.poNumber = data.PONumber;
          this.shipMethod = data.ShipMethod;
          this.trackingNumber = data.TrackingNO;
          this.shippingDate = data.RequiredShipDate;
        }
      });
  }

}