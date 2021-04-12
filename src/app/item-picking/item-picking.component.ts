import { Component, OnInit, HostListener } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OrderService } from "../services/order.service";
import { StateService } from "../services/state.service";
import { ItemInfoService } from "../services/item-info.service";
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
  isWaitingForItemVerification=false;
  scannedValue = [];
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
    private itemService:ItemInfoService,
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
  @HostListener("window:keypress", ["$event"]) keyEvent(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.error = null;
      var scanned = this.scannedValue.join("");
 
      if (scanned != null && scanned != "") this.getScannedItem(scanned);
      this.scannedValue = [];
    } else {
  
      this.scannedValue.push(event.key);
    }
  }
    getScannedItem(scanned) {
    this.loading = true;
    this.scannedValue=[];
    this.itemService.getItemInfo(scanned).subscribe(
      data => {
        this.itemCode=null;
        if (data.status == 200) {
        //  console.log(data);
        console.log(data.body);
        if(this.item== data.body.ItemCode||this.asin==data.body.ASIN){
            this.getPickLocationAndPick();
        }else{
          this.error="please scan or type the correct item"
        }
        //  console.log(this.filterArgs);
          //this.router.navigate(["item-picking/"+this.selection+"/"+data.body.ItemCode]);
        }
        this.loading = false;
      },
      err => {
       this.itemCode=null;
        this.error = err.error.error;
        this.loading = false;
      }
    );
  }
  getItemLabel(){
    this.loading = true;
    // for testing remove the printer number to avoid printing 
    //this.stateService.printer
    this.orderService
      .getItemLabel(this.selection,this.item,this.stateService.printer)
      .subscribe(
        data => {
          //console.log(data);
          this.lines = data.Lines;
          this.asin=this.lines[0].ExternalItemID
          this.poNumber = data.PONumber;
          this.shipMethod = data.ShipMethod;
          this.trackingNumber = data.TrackingNO;
          this.shippingDate = data.RequiredShipDate;
          this.batchId=data.BatchId;
          this.id=data.id;
       //   console.log(data);
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

      this.orderService.getItemPickLocationPerPO(value.Item,this.batchId,this.poNumber,value.ExternalItemID).subscribe(
        dat=>{
          value.Location=[];
         
          console.log(dat[0].ItemCode);
          dat.forEach(locat=>{
          this.item=locat.ItemCode;
          this.lines[0].Item=locat.ItemCode;
          var loc=
          {
            BinNumber:locat.BinNumber,
            Quantity:"",
            PackSize:"",
          }
          locat.AllocatationList.forEach(alloc=>{
 
            if(alloc.DocumentNumber==this.poNumber){
              loc.Quantity=alloc.Quantity;
              loc.PackSize=alloc.PackSize;
            }
          });
          value.Location.push(loc);
   
          });
         this.error="please scan or type the item to print"
         this.isWaitingForItemVerification=true;
         this.loading=false;
        },
         err => {
            var loc=
          {
            BinNumber:"Not Alocated Please Allocate",
            Quantity:"",
            PackSize:"",
          }
           value.Location=[];
          value.Location.push(loc);
          console.log(err);
          this.loading=false;
        }
       
      );
    });
    }
    getPickLocationAndPick(){
      this.loading=true;
      this.isWaitingForItemVerification=false;
    this.lines.forEach(value=>{

      this.orderService.getItemPickLocationPerPO(value.Item,this.batchId,this.poNumber,value.ExternalItemID).subscribe(
        dat=>{
          dat.forEach(locat=>{
          var loc=
          {
            BinNumber:locat.BinNumber,
            Quantity:"",
            PackSize:"",
          }
          locat.AllocatationList.forEach(alloc=>{
 
            if(alloc.DocumentNumber==this.poNumber){
              loc.Quantity=alloc.Quantity;
              loc.PackSize=alloc.PackSize;
            }
          });
        this.pickItem(value,locat.id,loc.Quantity,this.batchId,this.poNumber);
          });
        },
         err => {
            var loc=
          {
            BinNumber:"Not Alocated Please Allocate",
            Quantity:"",
            PackSize:"",
          }
           value.Location=[];
          value.Location.push(loc);
          console.log(err);
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

  pickItem(item,id:string,qty,batchId:string,poNumber:string){
    this.loading=true;
    this.orderService.pickItem(id,qty,batchId,poNumber).subscribe(
      data=>
      {
       
         this.pickSuccess=true;
          this.printLabelAndMark();
      },
      err=>
      {
          console.log(err);
                   var loc=
          {
            BinNumber:"Failed in picking the item.",
            Quantity:"",
            PackSize:"",
          }
          item.Location.push(loc);
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
         console.log(err);
         this.loading=false;
      }
    )
  }
}
