import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ItemInfoService {
  url={
    GetItemInfo:"https://directfulfillmentapi20200813154717.azurewebsites.net/api/GetItemInfo/"
  }
  constructor(private http: HttpClient) { }

  getItemInfo(itemId){
  
    return this.http.get(this.url.GetItemInfo+itemId,{observe : 'response'});
  }
}