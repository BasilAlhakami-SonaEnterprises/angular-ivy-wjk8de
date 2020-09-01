import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class OrderService {
  urls = {
    ShipsTodayNextDay:
      "https://directfulfillmentapi20200813154717.azurewebsites.net/api/CountOfNextDayShipmentsShipsToday",
    ShipsTodayOther: "https://directfulfillmentapi20200813154717.azurewebsites.net/api/CountOfNotNextDayShipmentsShipsToday?",
    ShipsLaterNextDay: "https://directfulfillmentapi20200813154717.azurewebsites.net/api/CountOfNextDayShipmentsShipsAfterToday?",
    ShipsLaterOther: "https://directfulfillmentapi20200813154717.azurewebsites.net/api/CountOfNotNextDayShipmentsShipsAfterToday?"
  };

  constructor(private http: HttpClient) {}

  printStoreBoxLabels(storeNumber, cartonCount, printerNumber) {
    return this.http.get(
      "https://seamzndfppremise.azurewebsites.net/api/PrintSteinmartCartonLabels/" +
        storeNumber +
        "/" +
        cartonCount +
        "/" +
        printerNumber +
        "/false?code=I7am1TLHHmOqAOznxN4cLMwuPTo65lztq8dxrIyjz9ArflbaoPhzWw=="
    );
  }

  printStorePalletLabels(storeNumber, cartonCount, printerNumber) {
    return this.http.get(
      "https://seamzndfppremise.azurewebsites.net/api/PrintSteinmartCartonLabels/" +
        storeNumber +
        "/" +
        cartonCount +
        "/" +
        printerNumber +
        "/true?code=I7am1TLHHmOqAOznxN4cLMwuPTo65lztq8dxrIyjz9ArflbaoPhzWw=="
    );
  }

  updateSteinPallet(storeNumber, cartonCount, length, width, height, weight) {
    return this.http.get(
      "https://seamzndfppremise.azurewebsites.net/api/UpdateSteinmartPallet/" +
        storeNumber +
        "/" +
        cartonCount +
        "/" +
        length +
        "/" +
        width +
        "/" +
        height +
        "/" +
        weight +
        "?code=QxTZ8EwrLvbt9wRGt1/0rySPnYU7Hhmx2QaKPLMQCpiCkjrvuDl1zw=="
    );
  }

  steinConfirm(storeNumber) {
    return this.http.get(
      "https://seamzndfppremise.azurewebsites.net/api/SteinConfirm/" +
        storeNumber +
        "?code=vNZZBan0TatzTnh2Pf3DHrEaWCdPdaA3C6xja6M0zdnaP0QpFxJrRA=="
    );
  }

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
}

//https://seamzndfppremise.azurewebsites.net/api/PrintSteinmartCartonLabels/{storeNO}/{cartonCount}/{printerNO}?code=I7am1TLHHmOqAOznxN4cLMwuPTo65lztq8dxrIyjz9ArflbaoPhzWw==

//https://seamzndfppremise.azurewebsites.net/api/PrintSteinmartCartonLabels/{storeNO}/{cartonCount}/{printerNO}/{isPallet:bool?}?code=I7am1TLHHmOqAOznxN4cLMwuPTo65lztq8dxrIyjz9ArflbaoPhzWw==

//https://seamzndfppremise.azurewebsites.net/api/SteinConfirm/{storeNO}?code=vNZZBan0TatzTnh2Pf3DHrEaWCdPdaA3C6xja6M0zdnaP0QpFxJrRA==
