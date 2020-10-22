import { Component, OnInit, HostListener } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OrderService } from "../services/order.service";
import { ItemInfoService } from "../services/item-info.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-pick-list-item",
  templateUrl: "./pick-list-item.component.html",
  styleUrls: ["./pick-list-item.component.css"]
})
export class PickListItemComponent implements OnInit {
  columnsToDisplay = ["Code", "Qty"];

  data; // [{Code: "FS374", Qty: 13}, {Code: "DD312", Qty: 20}];
  selection;
  error;
  loading = false;
  scannedValue = [];
  filterArgs;
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private itemService: ItemInfoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selection = params["id"]; // (+) converts string 'id' to a number
      console.log(this.selection);
      this.loadList();
    });
  }

  loadList() {
    switch (this.selection) {
      case "ShipsTodayNextDay": {
        this.loadShipsTodayNextDayList();
        break;
      }
      case "ShipsTodayOther": {
        this.loadShipsTodayOtherList();
        break;
      }
      case "ShipsLaterNextDay": {
        this.loadShipsLaterNextDayList();
        break;
      }
      case "ShipsLaterOther": {
        this.loadShipsLaterOtherList();
        break;
      }
    }
  }
  @HostListener("window:keypress", ["$event"]) keyEvent(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.error = null;
      var scanned = this.scannedValue.join("");
      if (scanned != null && scanned != "") this.getScannedItem(scanned);
      this.scannedValue = [];
    } else {
      this.scannedValue.push(event.key);
    }
  }

  loadShipsTodayNextDayList() {
    this.loading = true;
    this.orderService.getShipsTodayNextDayItemList().subscribe(data => {
      this.loading = false;
      console.log(data);
      this.data = data;
      this.getLocation();
    });
  }

  loadShipsTodayOtherList() {
    this.loading = true;
    this.orderService.getShipsTodayOtherItemList().subscribe(data => {
      this.loading = false;
      console.log(data);
      this.data = data;
      this.getLocation();
    });
  }

  loadShipsLaterNextDayList() {
    this.loading = true;
    this.orderService.getShipsLaterNextDayItemList().subscribe(data => {
      this.loading = false;
      console.log(data);
      this.data = data;
      this.getLocation();
    });
  }

  loadShipsLaterOtherList() {
    this.loading = true;
    this.orderService.getShipsLaterOtherItemList().subscribe(data => {
      this.loading = false;
      console.log(data);
      this.data = data;
      this.getLocation();
    });
  }

  getScannedItem(scanned) {
    this.loading = true;
    this.itemService.getItemInfo(scanned).subscribe(
      data => {
        if (data.status == 200) {
          console.log(data);
          this.filterArgs = data.body.ItemCode;
          console.log(this.filterArgs);
          //this.router.navigate(["item-picking/"+this.selection+"/"+data.body.ItemCode]);
        }
        this.loading = false;
      },
      err => {
        this.error = err.error;
        this.loading = false;
      }
    );
  }

  getLocation() {
    this.data.forEach(value => {
      console.log(value.Item + " " + value.QTY);
      this.orderService.getItemLocation(value.Item, value.QTY).subscribe(
        dat => {
          //console.log(dat);
          value.Location = dat.binNumber;
        },
        err => {
          //console.log("!");
          value.Location = "";
        }
      );
    });

    setTimeout(() => {
      this.data = this.data.sort((a, b) => (a.Location > b.Location ? -1 : 1));
    }, 5000);
  }



  SortByBinClick() {
    
    //console.log(this.data);
  }
}

class Item {
  Code: string;
  Qty: number;
}
