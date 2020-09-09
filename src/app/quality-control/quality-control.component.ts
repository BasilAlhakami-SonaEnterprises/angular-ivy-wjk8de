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
  ngOnInit() {
  }
  createLicensePlate(){
    this.licensePlateService.createLicensePlate().subscribe(data=>{
      this.licensePlateId=data;
    })
  }

}