import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable()
export class LicensePlateService {
    urls = {
      CreateLicensePlate:"https://directfulfillmentapi20200813154717.azurewebsites.net/api/CreateLicensePlate/",
      GetLicensePlate:"https://directfulfillmentapi20200813154717.azurewebsites.net/api/GetLicensePlate/",
      AddOrderToLicensePlate:"https://directfulfillmentapi20200813154717.azurewebsites.net/api/AddOrderToLicensePlate?",
      MarkLicensePlateShipped:"https://directfulfillmentapi20200813154717.azurewebsites.net/api/MarkLicensePlateShipped?",
      EmptyLicensePlate:"https://directfulfillmentapi20200813154717.azurewebsites.net/api/EmptyLicensePlat?"
   };
   request={
     PONumber:"",
     LicensePlateId:""
   };
  constructor(private http: HttpClient) { }
  
  createLicensePlate(printerNumber){
    return this.http.get(this.urls.CreateLicensePlate+printerNumber,{responseType: 'text'});
  }

  getLicensePlate(licensePlateId){
    return this.http.get(this.urls.GetLicensePlate+licensePlateId);
  }

  addOrderToLicensePlate(licensePlateId,poNumber){
    this.request.PONumber=poNumber;
    this.request.LicensePlateId=licensePlateId;
    return this.http.post(this.urls.AddOrderToLicensePlate,this.request,{observe : 'response',responseType: 'text'});
  }

  markLicensePlateShipped(licensePlateId){
    this.request.LicensePlateId=licensePlateId;
    return this.http.post(this.urls.MarkLicensePlateShipped,this.request,{observe : 'response',responseType: 'text'});
  }
  emptyLicensePlate(licensePlateId){
    this.request.LicensePlateId=licensePlateId;
    return this.http.post(this.urls.EmptyLicensePlate,this.request,{observe : 'response',responseType: 'text'});
  }
}