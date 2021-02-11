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
  pickSuccess=false
  id="";
  batchId="";
  printer = "";
  error = "";
  loading : boolean = false;

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
   // this.loading=true;
    //this.orderService
   // .pickItem
     this.pickSuccess=false;
     this.getItemLabel();
      
  }

  getItemLabel(){
    this.loading = true;
    // for testing remove the printer number to avoid printing 
    //this.stateService.printer
    this.orderService
      .getItemLabel(this.selection,this.item,this.stateService.printer)
      .subscribe(
        data => {
          console.log(data);
          this.lines = data.Lines;
          this.poNumber = data.PONumber;
          this.shipMethod = data.ShipMethod;
          this.trackingNumber = data.TrackingNO;
          this.shippingDate = data.RequiredShipDate;
          this.batchId=data.BatchId;
          this.id=data.id;
          this.getPickLocation();
          //this.getPickLocationAndPick();
         // this.loading = false;
        },

        err => {
          console.log("!");

          //{"error":"we have no labels to print"}
          console.log(err);
          if ((err.error = "we have no labels to print"))
            this.lines = [{ Item: "Good job Monu! No more labels." }];
          else this.lines = [{ Item: "Error" }];
          this.item = "Error";
          this.error = err.error;
          this.loading = false;
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


    getPickLocation(){
      this.loading=true;
    this.lines.forEach(value=>{
    console.log(value.Item+" "+value.QTY+" "+value.BatchId);
      this.orderService.getItemPickLocation(value.Item,value.QTY,this.batchId).subscribe(
        dat=>{
          value.Location=dat.binNumber;

          this.pickItem(value,dat.docId,value.QTY,this.batchId);
        },
         err => {
          value.Location = "Not Alocated Please Allocate";
          this.loading=false;
        }
       
      );
    });
  }

  /*getLocation() {
    this.lines.forEach((value) => {
      console.log(value.Item + " " + value.QTY);
      this.orderService.getItemLocation(value.Item, value.QTY).subscribe(
        data => {
          //console.log(data);
          
          value.Location = data.binNumber;
        },
        err => {
          console.log("!");
        }
      );
    });
  }*/

  pickItem(item,id:string,qty,batchId:string){
    this.loading=true;
    this.orderService.pickItem(id,qty,batchId).subscribe(
      data=>
      {
         this.pickSuccess=true;
          this.printLabelAndMark();
      },
      err=>
      {
          console.log(err);
          item.Location = "Failed in picking the item.";
          this.loading=false;
      }
    )
  }
  printLabelAndMark(){
    this.loading=true;
    this.orderService.printLabelAndMark(this.id,this.stateService.printer).subscribe(
      data=>
      {
        this.loading=false;
      },
      err=>{
         this.loading=false;
      }
    )
  }
}
