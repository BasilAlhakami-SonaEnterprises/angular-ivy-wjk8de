import { Component, OnInit,HostListener } from '@angular/core';
import {LicensePlateService} from "../services/licenseplate.service";
import {Router} from '@angular/router';
@Component({
  selector: 'app-quality-control',
  templateUrl: './quality-control.component.html',
  styleUrls: ['./quality-control.component.css']
})
export class QualityControlComponent implements OnInit {
  
  constructor(private licensePlateService:LicensePlateService,private router:Router) { }
   creatingAndPrintingLicensePlate=false;
   licensePlateId;
   scannedValue=[];
   gettingLicensePlate=false;
   error;
   printerNumber="printer1";
  ngOnInit() {
  }

@HostListener('window:keypress',['$event'])keyEvent(event:KeyboardEvent){
    if(event.key==='Enter'){
      this.error=null;
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
    }else{
      console.log(scanned+"   this must be a license plate number");
       this.licensePlateId=scanned;
         this.scanLicensePlate();
    }
  }

  createAndPrintLicensePlate(){
    this.creatingAndPrintingLicensePlate=true;
    this.licensePlateService.createLicensePlate(this.printerNumber).subscribe((data)=>{
      this.creatingAndPrintingLicensePlate=false;
      this.licensePlateId=data;
    },
    (err)=>{console.log(err)}
    )
  }
  scanLicensePlate(){
     this.gettingLicensePlate=true;
   this.licensePlateService.getLicensePlate(this.licensePlateId)
   .subscribe((data)=>{
  if(data.status==200){
   this.router.navigate(['quality-control-scan'],{queryParams:{licensePlateId:this.licensePlateId}})
  }
    this.gettingLicensePlate=false;
   },
   (err)=>{
     console.log(err);
     this.error=err.error;
     this.gettingLicensePlate=false;
   }
   );
      ;
  }
 
  



}