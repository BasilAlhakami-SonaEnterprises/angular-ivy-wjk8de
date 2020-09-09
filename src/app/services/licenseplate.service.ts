import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable()
export class LicensePlateService {
    urls = {
      CreateLicensePlate:"https://directfulfillmentapi20200813154717.azurewebsites.net/api/CreateLicensePlate?",
      GetLicensePlate:"https://directfulfillmentapi20200813154717.azurewebsites.net/api/GetLicensePlate/",
      AddOrderToLicensePlate:"https://directfulfillmentapi20200813154717.azurewebsites.net/api/AddOrderToLicensePlate?",
      MarkToteShipped:"https://directfulfillmentapi20200813154717.azurewebsites.net/api/MarkToteShipped?"
   };
   request={
     PONumber:"",
     LicensePlateId:""
   };
  constructor(private http: HttpClient) { }
  
  createLicensePlate(){
    return this.http.get(this.urls.CreateLicensePlate,{responseType: 'text'});
  }

  getTote(licensePlateId){
    return this.http.get(this.urls.GetLicensePlate+licensePlateId);
  }

  addOrderToTote(poNumber,licensePlateId){
    this.request.PONumber=poNumber;
    this.request.LicensePlateId=licensePlateId;
    return this.http.post(this.urls.AddOrderToLicensePlate,this.request);
  }

  markToteShipped(licensePlateId){
    this.request.LicensePlateId=licensePlateId;
    return this.http.post(this.urls.MarkToteShipped,this.request);
  }
}