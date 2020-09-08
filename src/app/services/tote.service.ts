import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable()
export class ToteService {
    urls = {
      CreateTote:"https://directfulfillmentapi20200813154717.azurewebsites.net/api/CreateTote?",
      GetTote:"https://directfulfillmentapi20200813154717.azurewebsites.net/api/GetTote/",
      AddOrderToTote:"https://directfulfillmentapi20200813154717.azurewebsites.net/api/AddOrderToTote?",
      MarkToteShipped:"https://directfulfillmentapi20200813154717.azurewebsites.net/api/MarkToteShipped?"
   };
   request={
     PONumber:"",
     ToteId:""
   };
  constructor(private http: HttpClient) { }
  
  createTote(){
    return this.http.get(this.urls.CreateTote);
  }

  getTote(toteId){
    return this.http.get(this.urls.GetTote+toteId);
  }

  addOrderToTote(poNumber,toteId){
    this.request.PONumber=poNumber;
    this.request.ToteId=toteId;
    return this.http.post(this.urls.AddOrderToTote,this.request);
  }

  markToteShipped(toteId){
    this.request.ToteId=toteId;
    return this.http.post(this.urls.MarkToteShipped,this.request);
  }
}