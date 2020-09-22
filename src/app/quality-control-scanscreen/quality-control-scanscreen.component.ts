import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-quality-control-scanscreen',
  templateUrl: './quality-control-scanscreen.component.html',
  styleUrls: ['./quality-control-scanscreen.component.css']
})
export class QualityControlScanscreenComponent implements OnInit {
  licensePlateId;
  constructor(private route:Router) { }

  ngOnInit() {
    this.route.queryParams
    .filter(params=>params.licensePlateId)
    .subscribe(params=>{
      console.log(params);
      this.licensePlateId=params.licensePlateId;
    })
  }

}