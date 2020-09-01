import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router"; // CLI imports router
import { PickListComponent } from "../pick-list/pick-list.component";
import { PickListItemComponent } from "../pick-list-item/pick-list-item.component";
import { PrintLabelComponent } from "../print-label/print-label.component";
import { SteinConfirmComponent} from "../stein-confirm/stein-confirm.component";
import { SteinPalletUpdateComponent} from "../stein-pallet-update/stein-pallet-update.component"

const routes: Routes = [
  { path: "picking", component: PickListComponent },
  { path: "item-selection", component: PickListItemComponent },
  { path: "print-label", component: PrintLabelComponent },
  { path: "update-stein-pallet", component: SteinPalletUpdateComponent},
    { path: "stein-confirm", component: SteinConfirmComponent}
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
