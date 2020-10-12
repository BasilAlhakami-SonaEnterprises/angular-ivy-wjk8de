import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LicensePlateService } from "../services/licenseplate.service";
import { OrderService } from "../services/order.service";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ConfirmDialogService } from "../services/confirm-dialog.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-quality-control-scan",
  templateUrl: "./quality-control-scan.component.html",
  styleUrls: ["./quality-control-scan.component.css"]
})
export class QualityControlScanComponent implements OnInit {
  licensePlateId;
  licensePlate = null;
  scannedValue = [];
  count;
  order = null;
  error = null;
  gettingLicensePlate = false;
  markingLicensePlate = false;
  gettingOrder = false;
  addingOrderToLicensePlate = false;
  showConfirmQuantityForm = false;
  emptyingLicnensePlate = false;
  trackingNumber;
  shipDate;

  @ViewChild("name") nameField: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private licensePlateService: LicensePlateService,
    private orderService: OrderService,
    private dialogService: ConfirmDialogService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  public openconfirmDialog(options) {
    this.dialogService.open(options);
    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.order = null;
        this.getOrder(this.trackingNumber);
      }
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

  @HostListener("window:keypress", ["$event"]) keyEvent(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.scanFilter(this.scannedValue.join(""));
      this.scannedValue = [];
    } else {
      this.scannedValue.push(event.key);
    }
  }
  scanFilter(scanned) {
    if (scanned.length === 0) {
      console.log("nothing scanned");
      return;
    }
    if (scanned.length === 18 && scanned[0] == "1" && scanned[1] == "Z") {
      this.error = null;
      this.showConfirmQuantityForm = false;
      this.count = null;
      console.log(scanned + "  this is a tracking number");
      this.trackingNumberLogic(scanned);
    } else if (scanned.length === 24) {
      console.log(scanned + "   this must be a license plate number");
      this.error = null;
      this.showConfirmQuantityForm = false;
      this.count = null;
      this.licensePlateLogic(scanned);
    }
  }
  trackingNumberLogic(trackingNumber) {
    if (this.order == null) {
      this.getOrder(trackingNumber);
    } else if (this.order.TrackingNO === trackingNumber) {
      this.addOrderToLicensePlate(
        this.licensePlate.LicensePlateId,
        this.order.PONumber
      );
    } else {
      // open the dialog here
      this.trackingNumber = trackingNumber;
      this.openconfirmDialog({
        title: "You scanned another Tracking Number",
        message:
          "You scanned another tracking number while the current one wasn't dealt with yet, are you sure you want to switch to what you just scanned?",
        cancelText: "Cancel",
        confirmText: "Yes"
      });
    }
  }

  licensePlateLogic(licensePlateId) {
    if (licensePlateId === this.licensePlate.LicensePlateId) {
      this.getLP();
      this.showConfirmQuantityForm = true;
      this.nameField.nativeElement.focus();
    }
  }
  confirmCount(count) {
    this.error = null;
    if (count == this.licensePlate.Orders.length) {
      console.log("count is correct confrim");
      this.markLicensePlateShipped(this.licensePlate.LicensePlateId);
    } else {
      this.error =
        "the count you entered is incorrect please rescan wait for the spinner to finish first ";
      this.emptyLicensePlate(this.licensePlate.LicensePlateId);
    }
    this.showConfirmQuantityForm = false;
  }

  addOrderToLicensePlate(licensePlateNumber, poNumber) {
    this.addingOrderToLicensePlate = true;
    this.licensePlateService
      .addOrderToLicensePlate(licensePlateNumber, poNumber)
      .subscribe(
        data => {
          console.log(data);
          if (data.status == 200) {
            this.openSnackBar("order added to LP", "dismiss");
            this.order = null;
          }
          this.addingOrderToLicensePlate = false;
        },
        err => {
          console.log(err);
          this.error = err.error;
          this.order = null;
          this.addingOrderToLicensePlate = false;
        }
      );
  }
  getOrder(trackingNumber) {
    this.gettingOrder = true;
    this.orderService
      .getByTrackingNumber(trackingNumber.toUpperCase())
      .subscribe(
        data => {
          this.order = data;
          this.gettingOrder = false;
        },
        err => {
          console.log(err);
          this.gettingOrder = false;
        }
      );
  }

  markLicensePlateShipped(licensePlateId) {
    this.markingLicensePlate = true;
    this.licensePlateService.markLicensePlateShipped(licensePlateId).subscribe(
      data => {
        console.log(data);
        if (data.status == 200) {
          this.openSnackBar(
            "this LP is marked confirmed back to the main QC page",
            "dismiss"
          );
          this.router.navigate(["quality-control"]);
        }
        this.markingLicensePlate = false;
      },
      err => {
        this.error = err.error;
        this.markingLicensePlate = false;
      }
    );
  }

  emptyLicensePlate(licensePlateId) {
    this.emptyingLicnensePlate = true;
    this.licensePlateService.emptyLicensePlate(licensePlateId).subscribe(
      data => {
        console.log(data);
        if (data.status == 200) {
          this.openSnackBar("start re scanning all orders", "dismiss");
        }
        this.emptyingLicnensePlate = false;
      },
      err => {
        console.log(err);
        this.error = err.error;
        this.emptyingLicnensePlate = false;
      }
    );
  }

  getLP() {
    this.gettingLicensePlate = true;
    this.licensePlateService.getLicensePlate(this.licensePlateId).subscribe(
      data => {
        console.log(data);
        this.licensePlate = JSON.parse(data.body);
        this.gettingLicensePlate = false;
      },
      err => {
        console.log(err);
        this.gettingLicensePlate = false;
      }
    );
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.licensePlateId = params.licensePlateId;
    });
    this.getLP();
  }
}
