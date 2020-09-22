import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-quality-controlscanscreen',
  templateUrl: './quality-controlscanscreen.component.html',
  styleUrls: ['./quality-controlscanscreen.component.css']
})
export class QualityControlscanscreenComponent implements OnInit {
   licensePlateId;
  constructor(private route:Router) { }

  ngOnInit() {
    //  this.route.queryParams
  // .filter(params=>params.licensePlateId)
  //  .subscribe(params=>{
    // console.log(params);
     // this.licensePlateId=params.licensePlateId;
  //  })
  }

}