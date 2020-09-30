import { Component, OnInit } from '@angular/core';
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
   licensePlateId
   printerNumber="printer1";
  ngOnInit() {
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
      this.router.navigate(['quality-control-scan'],{queryParams:{licensePlateId:this.licensePlateId}});
  }
 
  



}