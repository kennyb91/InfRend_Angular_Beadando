import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tenant } from 'src/app/models/tenant';
import { FeeService } from 'src/app/services/fee.service';
import { PaymentService } from 'src/app/services/payment.service';
import { TenantService } from 'src/app/services/tenant.service';

@Component({
  selector: 'app-general-report',
  templateUrl: './general-report.component.html',
  styleUrls: ['./general-report.component.css']
})
export class GeneralReportComponent implements OnInit {

  tenants: Tenant[];
  dateStart;
  dateEnd;
  fees: any[];
  payments: any[];
  totalFee = 0;
  totalPayment=0;
  totalBalance=0;

  constructor(public feeService: FeeService,
    public paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    public tenantService: TenantService) { }

  async ngOnInit() {
    this.tenants = await this.tenantService.getAllTenants();
    this.dateStart = this.activatedRoute.snapshot.queryParamMap.get('dateStart');
    this.dateEnd = this.activatedRoute.snapshot.queryParamMap.get('dateEnd');

    this.fees = new Array(this.tenants.length).fill('');
    this.payments = new Array(this.tenants.length).fill('');

    for (let index = 0; index < this.tenants.length; index++) {
      this.fees[index] = await this.getAllFees(this.tenants[index]);
      this.payments[index] = await this.getAllPayments(this.tenants[index]);
    }

    this.sumFee();
    this.sumPayments();
    this.sumBalance();
  }


  async getAllFees(tenant: Tenant): Promise<any> {
    return await this.feeService.getAllFees(tenant.id, this.dateStart, this.dateEnd);
  }

  async getAllPayments(tenant: Tenant): Promise<any> {
    return await this.paymentService.getAllFees(tenant.id, this.dateStart, this.dateEnd);
  }

  sumFee() {
    for (let index = 0; index < this.fees.length; index++) {
      var subTotal = 0;
      this.fees[index].forEach(element => {
        subTotal = Number(subTotal) + Number(element.amount);
      });

      this.fees[index] = subTotal;
      this.totalFee= this.totalFee + subTotal;
    }

  }


  sumPayments() {
    for (let index = 0; index < this.payments.length; index++) {
      var subTotal = 0;
      this.payments[index].forEach(element => {
        subTotal = Number(subTotal) + Number(element.amount);
      });
      this.payments[index] = subTotal;
      this.totalPayment= this.totalPayment + subTotal;
    }

  }

  sumBalance() {
    this.tenants.forEach(tenant => {
      this.totalBalance= Number(this.totalBalance) + Number(tenant.balance);
    });
  }


}