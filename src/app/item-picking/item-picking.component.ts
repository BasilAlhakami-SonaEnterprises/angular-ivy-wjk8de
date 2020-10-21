import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OrderService } from "../services/order.service";
import { StateService } from "../services/state.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-item-picking",
  templateUrl: "./item-picking.component.html",
  styleUrls: ["./item-picking.component.css"]
})
export class ItemPickingComponent implements OnInit {
  selection;
  item = "Hit next to start.";
  qty = "";
  lines = [{ Item: "Hit next to start", QTY: 1, Location: "" }];
  poNumber = "";
  shipMethod = "";
  trackingNumber = "";
  shippingDate = "";
  printer = "";
  error = "";

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private stateService: StateService,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selection = params["selection"]; // (+) converts string 'id' to a number
      this.item = params["item"];
      console.log(this.selection);
      console.log(this.item);
      console.log(this.stateService.printer);
    });
  }

  nextClick() {
    console.log(this.printer);
    this.orderService
      .getItemLabel(this.selection, this.item, this.stateService.printer)
      .subscribe(
        data => {
          console.log(data);
          this.lines = data.Lines;
          this.poNumber = data.PONumber;
          this.shipMethod = data.ShipMethod;
          this.trackingNumber = data.TrackingNO;
          this.shippingDate = data.RequiredShipDate;
          this.getLocation();
        },

        err => {
          console.log("!");

          //{"error":"we have no labels to print"}
          if ((err.error = "we have no labels to print"))
            this.lines = [{ Item: "Good job Monu! No more labels." }];
          else this.lines = [{ Item: "Error" }];
          this.item = "Error";
          this.error = err.error;
        }

      );

      
  }

  reprintClick() {
    console.log("reprint");
    this.orderService
      .reprintItemLabel(this.poNumber, this.stateService.printer)
      .subscribe();
  }

  backClick() {
    this.location.back();
  }

  getLocation() {
    this.lines.forEach((value) => {
      console.log(value.Item + " " + value.QTY);
      this.orderService.getItemLocation(value.Item, value.QTY).subscribe(
        data => {
          console.log(data);
          value.Location = data.binNumber;
        },
        err => {
          console.log("!");
        }
      );
    });
  }
}
