import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router"; // CLI imports router
import { PickListComponent } from "../pick-list/pick-list.component";
import { PickListItemComponent } from "../pick-list-item/pick-list-item.component";
import { PrintLabelComponent } from "../print-label/print-label.component";
import {QualityControlComponent} from "../quality-control/quality-control.component";
import{QualityControlScanComponent} from "../quality-control-scan/quality-control-scan.component";
import { ItemPickingComponent} from "../item-picking/item-picking.component";

const routes: Routes = [
  { path: "picking", component: PickListComponent },
   { path: "item-selection/:id", component: PickListItemComponent },
  { path: "print-label", component: PrintLabelComponent },
  {path:"quality-control",component:QualityControlComponent},
  {path:"quality-control-scan",component:QualityControlScanComponent}
 { path: "item-picking/:selection/:item", component: ItemPickingComponent}
 
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
