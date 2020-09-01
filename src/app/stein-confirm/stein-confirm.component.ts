import { Component, OnInit } from '@angular/core';
import { OrderService } from "../services/order.service";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-stein-confirm',
  templateUrl: './stein-confirm.component.html',
  styleUrls: ['./stein-confirm.component.css']
})
export class SteinConfirmComponent implements OnInit {

  storeNO ="";
  constructor(private orderService: OrderService,private _snackBar: MatSnackBar) {}

  ngOnInit() {}

    updateClick() {
    this.orderService
      .steinConfirm(this.storeNO)
      .subscribe(res => {

        this._snackBar.open( this.storeNO + ' updated!', "Done");
      });

  }
}