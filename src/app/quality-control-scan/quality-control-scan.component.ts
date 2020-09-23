import { Component, OnInit,HostListener } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LicensePlateService} from "../services/licenseplate.service";

@Component({
  selector: 'app-quality-control-scan',
  templateUrl: './quality-control-scan.component.html',
  styleUrls: ['./quality-control-scan.component.css']
})
export class QualityControlScanComponent implements OnInit {
  licensePlateId;
  licensePlate;
  scannedValue=[];
  gettingLicensePlate=false;
  constructor(private route:ActivatedRoute,private licensePlateService:LicensePlateService) { }
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
      // scan tracking number logic
    }else{
      console.log(scanned+"   this must be a license plate number")
      // scan license plate logic 
    }
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