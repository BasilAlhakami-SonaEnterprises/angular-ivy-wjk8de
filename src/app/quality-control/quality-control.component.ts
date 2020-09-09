import { Component, OnInit } from '@angular/core';
import {LicensePlateService} from "../services/licenseplate.service";
@Component({
  selector: 'app-quality-control',
  templateUrl: './quality-control.component.html',
  styleUrls: ['./quality-control.component.css']
})
export class QualityControlComponent implements OnInit {
  
  constructor(private licensePlateService:LicensePlateService) { }
   licensePlateId;
   licensePlate;
  ngOnInit() {
  }
  createLicensePlate(){
    this.licensePlateService.createLicensePlate().subscribe(data=>{
      this.licensePlateId=data;
      this.getLP();
    })
  }
  getLP(){
   this.licensePlateService.getLicensePlate(this.licensePlateId).subscribe(data=>{
     console.log(data);
     this.licensePlate=data;
   })
  }

}