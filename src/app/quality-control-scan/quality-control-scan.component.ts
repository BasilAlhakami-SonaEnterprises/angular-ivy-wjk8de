import { Component, OnInit } from '@angular/core';
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
  gettingLicensePlate=false;
  constructor(private route:ActivatedRoute,private licensePlateService:LicensePlateService) { }
  getLP(){
   this.gettingLicensePlate=true;
   this.licensePlateService.getLicensePlate(this.licensePlateId)
   .subscribe(data=>{
     this.licensePlate=data;
     console.log(this.licensePlate);
   },
   (err)=>{console.log(err)}
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