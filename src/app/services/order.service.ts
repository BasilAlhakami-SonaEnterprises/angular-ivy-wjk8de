import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class OrderService {
  urls = {
    ShipsTodayNextDay:
      "https://directfulfillmentapi20200813154717.azurewebsites.net/api/CountOfNextDayShipmentsShipsToday",
    ShipsTodayOther: "https://directfulfillmentapi20200813154717.azurewebsites.net/api/CountOfNotNextDayShipmentsShipsToday?",
    ShipsLaterNextDay: "https://directfulfillmentapi20200813154717.azurewebsites.net/api/CountOfNextDayShipmentsShipsAfterToday?",
    ShipsLaterOther: "https://directfulfillmentapi20200813154717.azurewebsites.net/api/CountOfNotNextDayShipmentsShipsAfterToday?",
    ByTrackingNumber:
    "https://directfulfillmentapi20200813154717.azurewebsites.net/api/GetOrderByTrackingNumber/"
  };

  constructor(private http: HttpClient) {}

  getShipsTodayNexyDayCount() {
    return this.http.get(this.urls.ShipsTodayNextDay);
  }

  getShipsTodayOtherCount() {
    return this.http.get(this.urls.ShipsTodayOther);
  }

  getShipsLaterNextDayCount() {
    return this.http.get(this.urls.ShipsLaterNextDay);
  }

  getShipsLaterOtherCount() {
    return this.http.get(this.urls.ShipsLaterOther);
  }

  getByTrackingNumber(trackingNo){
    return this.http.get(this.urls.ByTrackingNumber+trackingNo);
  }
}


