import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeComponent } from './fee/fee.component';
import { MovingComponent } from './moving/moving.component';
import { PaymentComponent } from './payment/payment.component';
import { ReportComponent } from './request-report/report/report.component';
import { GeneralReportComponent } from './request-report/general-report/general-report.component';
import { RequestReportComponent } from './request-report/request-report.component';
import { TenantFormComponent } from './moving/tenant-form/tenant-form.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {
  path: 'home',
    component: HomeComponent,},
  {
    path: 'moving',
    component: MovingComponent,
  },
  {
    path: 'fee',
    component: FeeComponent,
  },
  {
    path: 'payment',
    component: PaymentComponent,
  },
  {
    path: 'individual-report',
    component: ReportComponent,
  },
  {
    path: 'general-report',
    component: GeneralReportComponent,
  },
  {
    path: 'request-report',
    component: RequestReportComponent,
  },
  {
    path: 'tenant-form',
    component: TenantFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
