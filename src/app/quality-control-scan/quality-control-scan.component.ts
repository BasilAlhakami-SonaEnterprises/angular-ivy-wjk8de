import { Component, OnInit,HostListener } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LicensePlateService} from "../services/licenseplate.service";
import {OrderService} from "../services/order.service";
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import{ConfirmDialogService} from "../services/confirm-dialog.service";
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
  error=null;
  gettingLicensePlate=false;
  gettingOrder=false;
  addingOrderToLicensePlate=false;
  trackingNumber;
  constructor(private route:ActivatedRoute,private licensePlateService:LicensePlateService,private orderService:OrderService,private dialogService:ConfirmDialogService,public dialog: MatDialog,private _snackBar: MatSnackBar) { }



public openconfirmDialog(options){
    this.dialogService.open(options);
    this.dialogService.confirmed().subscribe(confirmed=>{
      if(confirmed){
        this.order=null;
        this.getOrder(this.trackingNumber);
      }
    });
}
openSnackBar(message:string,action:string){
  this._snackBar.open(message,action,{
    duration:3000.
  });
}


  @HostListener('window:keypress',['$event'])keyEvent(event:KeyboardEvent){
    this.error=null;
    if(event.key==='Enter'){
      this.scanFilter(this.scannedValue.join(""));
      this.scannedValue=[];
    }else{
      this.scannedValue.push(event.key);
    }
  }
  scanFilter(scanned){
    if(scanned.length===0){
      console.log("nothing scanned");
       return;
    }
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
        this.trackingNumber=trackingNumber;
        this.openconfirmDialog({"title":"You scanned another Tracking Number","message":"You scanned another tracking number while the current one wasn't dealt with yet, are you sure you want to switch to what you just scanned?","cancelText":"Cancel","confirmText":"Yes"});
     }
  }
 
  licensePlateLogic(licensePlateId){
     if(licensePlateId===this.licensePlate.LicensePlateId){

     }
  }
  addOrderToLicensePlate(licensePlateNumber,poNumber){
    this.addingOrderToLicensePlate=true;
    this.licensePlateService.addOrderToLicensePlate(licensePlateNumber,poNumber)
    .subscribe((data)=>{
      console.log(data);
      if(data.status==200){
      this.openSnackBar("order added to LP","dismiss")
      this.order=null;
      }
      this.addingOrderToLicensePlate=false},
    (err)=>{
      console.log(err);
       this.error=err.error;
       this.order=null;
      this.addingOrderToLicensePlate=false;
      }

    )
  }
  getOrder(trackingNumber){
     this.gettingOrder=true;
     this.orderService.getByTrackingNumber(trackingNumber.toUpperCase()).subscribe(data=>{
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

