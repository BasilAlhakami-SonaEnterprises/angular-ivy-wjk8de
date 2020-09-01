import { Component, OnInit } from "@angular/core";
import { OrderService } from "../services/order.service";
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: "app-stein-pallet-update",
  templateUrl: "./stein-pallet-update.component.html",
  styleUrls: ["./stein-pallet-update.component.css"]
})
export class SteinPalletUpdateComponent implements OnInit {
  storeNO ="";
  cartonCount = "";
  length = 48;
  width = 40;
  height = "";
  weight = "";
  constructor(private orderService: OrderService,private _snackBar: MatSnackBar) {}

  ngOnInit() {}

    updateClick() {
    this.orderService
      .updateSteinPallet(this.storeNO, this.cartonCount, this.length, this.width, this.height, this.weight)
      .subscribe(res => {

        this._snackBar.open( this.storeNO + ' updated!', "Done");
      });
    this.storeNO = "";
    this.cartonCount = "";
    this.height = "";
    this.weight = "";
  }
}
