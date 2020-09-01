import { Component, OnInit } from "@angular/core";
import { OrderService } from "../services/order.service";

@Component({
  selector: "app-print-label",
  templateUrl: "./print-label.component.html",
  styleUrls: ["./print-label.component.css"]
})
export class PrintLabelComponent implements OnInit {
  constructor(private orderService: OrderService) {}
  storeNO = "";
  cartonCount = "";
  printer = "";

  ngOnInit() {}

  printClick() {
    this.orderService
      .printStoreBoxLabels(this.storeNO, this.cartonCount, this.printer)
      .subscribe(res => {});
    this.storeNO = "";
    this.cartonCount = "";
  }

    printPalletClick() {
    this.orderService
      .printStorePalletLabels(this.storeNO, this.cartonCount, this.printer)
      .subscribe(res => {});
    this.storeNO = "";
    this.cartonCount = "";
  }
}
