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
  ngOnInit() {
  }
  createAndPrintLicensePlate(){
    this.creatingAndPrintingLicensePlate=true;
    this.licensePlateService.createLicensePlate().subscribe(()=>{
      this.creatingAndPrintingLicensePlate=false;
    },
    (err)=>{console.log(err)}
    )
  };
  scanLicensePlate(){
      this.router.navigate(['/scanScreen'],{queryParams:{licensePlateId:this.licensePlateId}});
  }
 
  



}