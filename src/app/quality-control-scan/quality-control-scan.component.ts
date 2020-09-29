import { Component, OnInit,HostListener } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LicensePlateService} from "../services/licenseplate.service";
import {OrderService} from "../services/order.service";
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-quality-control-scan',
  templateUrl: './quality-control-scan.component.html',
  styleUrls: ['./quality-control-scan.component.css']
})
export class QualityControlScanComponent implements OnInit {
  licensePlateId;
  licensePlate=null;
  scannedValue=[];
  order=null;
  gettingLicensePlate=false;
  gettingOrder=false;
  addingOrderToLicensePlate=false;
  constructor(private route:ActivatedRoute,private licensePlateService:LicensePlateService,private orderService:OrderService,public dialog: MatDialog) { }
  @HostListener('window:keypress',['$event'])keyEvent(event:KeyboardEvent){
    if(event.key==='Enter'){
      this.scanFilter(this.scannedValue.join(""));
      this.scannedValue=[];
    }else{
      this.scannedValue.push(event.key);
    }
  }
  scanFilter(scanned){
    if(scanned.length===18&&scanned[0]=='1'&&scanned[1]=='Z'){
      console.log(scanned+"  this is a tracking number");
      this.trackingNumberLogic(scanned);
    }else{
      console.log(scanned+"   this must be a license plate number");
      this.licensePlateLogic(scanned);
    }
  }
  trackingNumberLogic(trackingNumber){
     if(this.order==null){
        this.getOrder(trackingNumber);
     }
     else if(this.order.TrackingNO===trackingNumber){
       this.addOrderToLicensePlate(this.licensePlate.LicensePlateId,this.order.PONumber);
     }else{
        // open the dialog here 
        this.dialog.open(ExitOrderDialog);
     }
  }
  licensePlateLogic(licensePlate){
     
  }
  addOrderToLicensePlate(licensePlateNumber,poNumber){
    this.addingOrderToLicensePlate=true;
    this.licensePlateService.addOrderToLicensePlate(licensePlateNumber,poNumber)
    .subscribe((data)=>{
      console.log(data);
      this.addingOrderToLicensePlate=false},
    (err)=>{
      console.log(err);
      this.addingOrderToLicensePlate=false;
      }

    )
  }
  getOrder(trackingNumber){
     this.gettingOrder=true;
     this.orderService.getByTrackingNumber(trackingNumber).subscribe(data=>{
       this.order=data;
       this.gettingOrder=false;
     },
     (err)=>{
       console.log(err);
       this.gettingOrder=false;
       }
     );
  }


  getLP(){
   this.gettingLicensePlate=true;
   this.licensePlateService.getLicensePlate(this.licensePlateId)
   .subscribe(data=>{
     this.licensePlate=data;
     this.gettingLicensePlate=false;
     console.log(this.licensePlate);
   },
   (err)=>{
     console.log(err);
     this.gettingLicensePlate=false;
   }
   );
  }
  ngOnInit() {
     this.route.queryParams
    .subscribe(params=>{
     this.licensePlateId=params.licensePlateId;
    });
    this.getLP();
  }
}
@Component({
  selector:'exit-order-dialog',
  templateUrl:'exit-order-dialog.html'
})
export class ExitOrderDialog{}

