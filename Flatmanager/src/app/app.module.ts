import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApartmentComponent } from './moving/apartment/apartment.component';
import { PaymentComponent } from './payment/payment.component';
import { FeeComponent } from './fee/fee.component';
import { ReportComponent } from './request-report/report/report.component';
import { MovingComponent } from './moving/moving.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TenantFormComponent } from './moving/tenant-form/tenant-form.component';
import { RequestReportComponent } from './request-report/request-report.component';
import { GeneralReportComponent } from './request-report/general-report/general-report.component';
// https://www.npmjs.com/package/@fortawesome/angular-fontawesome

@NgModule({
  declarations: [
    AppComponent,
    MovingComponent,
    ApartmentComponent,
    PaymentComponent,
    FeeComponent,
    ReportComponent,
    TenantFormComponent,
    RequestReportComponent,
    GeneralReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
