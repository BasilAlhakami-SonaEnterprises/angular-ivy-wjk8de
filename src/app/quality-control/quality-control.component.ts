import { Component, OnInit } from '@angular/core';
import {LicensePlateService} from "../services/licenseplate.service";
import {OrderService} from  "../services/order.service";
@Component({
  selector: 'app-quality-control',
  templateUrl: './quality-control.component.html',
  styleUrls: ['./quality-control.component.css']
})
export class QualityControlComponent implements OnInit {
  
  constructor(private licensePlateService:LicensePlateService,private orderService:OrderService) { }
   licensePlateId;
   poNumber;
   trackingNumber;
   order;
   licensePlate;
   creatingLicensePlate=false;
   gettingLicensePlate=false;
   gettingOrder=false;
   addingOrderToLicensePlate=false;
  ngOnInit() {
  }
  createLicensePlate(){
    this.creatingLicensePlate=true;
    this.licensePlateService.createLicensePlate().subscribe(
      (data)=>{
      console.log(data);
      this.licensePlateId=data;
      this.creatingLicensePlate=false;
      this.getLP();
    },
    (err)=>{console.log(err)},
    );
  }
  getLP(){
   this.gettingLicensePlate=true;
 
   this.licensePlateService.getLicensePlate(this.licensePlateId).subscribe(data=>{
     this.licensePlate=data;
     console.log(this.licensePlate);
     this.gettingLicensePlate=false;
     
   },
   (err)=>{console.log(err)}
   );
  
  }
  getOrderandAddToLP(){
    this.gettingOrder=true;
    this.orderService.getByTrackingNumber(this.trackingNumber).subscribe(data=>{
      this.order=data;
      this.poNumber=this.order.PONumber;
      this.gettingOrder=false;
      this.addOrderToLicensePlate();
    },
    (err)=>{console.log(err)}
 
    );
  }
  addOrderToLicensePlate(){
    this.addingOrderToLicensePlate=true;
    this.licensePlateService.addOrderToLicensePlate(this.licensePlateId,this.poNumber).subscribe(()=>{
      this.addingOrderToLicensePlate=false;
       this.getLP();
    },
    (err)=>{console.log(err)}
    );
  }



}