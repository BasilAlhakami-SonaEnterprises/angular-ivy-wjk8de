import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from './material-module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule} from './app-routing/app-routing.module';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { PickListComponent } from './pick-list/pick-list.component';
import { PickListItemComponent } from './pick-list-item/pick-list-item.component';

import { OrderService } from './services/order.service';
import { PrintLabelComponent } from './print-label/print-label.component';
import { SteinPalletUpdateComponent } from './stein-pallet-update/stein-pallet-update.component';
import { SteinConfirmComponent } from './stein-confirm/stein-confirm.component';
import { LicensePlateService } from './services/licenseplate.service';
import { QualityControlComponent } from './quality-control/quality-control.component';



@NgModule({
  imports:      [ BrowserModule, FormsModule,HttpClientModule, FlexLayoutModule, MaterialModule, BrowserAnimationsModule, AppRoutingModule ],
  declarations: [ AppComponent, PickListComponent, PickListItemComponent, PrintLabelComponent, SteinPalletUpdateComponent, SteinConfirmComponent, QualityControlComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ OrderService, LicensePlateService]
})
export class AppModule { }
