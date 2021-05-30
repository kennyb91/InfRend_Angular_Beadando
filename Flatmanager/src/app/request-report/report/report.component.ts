import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tenant } from '../../models/tenant';
import { FeeService } from '../../services/fee.service';
import { PaymentService } from '../../services/payment.service';
import { TenantService } from '../../services/tenant.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  tenant: Tenant;
  dateStart;
  dateEnd;
  fees: any[];
  payments: any[];
  total = 0;

  constructor(public feeService: FeeService,
    public paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    public tenantService: TenantService) {
  }

  async ngOnInit() {
    var id = this.activatedRoute.snapshot.queryParamMap.get('id');
    this.tenant = await this.tenantService.getOne(id);
    this.dateStart = this.activatedRoute.snapshot.queryParamMap.get('dateStart');
    this.dateEnd = this.activatedRoute.snapshot.queryParamMap.get('dateEnd');
    this.fees = await this.getAllFees();
    this.payments = await this.getAllPayments();
    this.setTotal();

  }

  async getAllFees(): Promise<any> {
    return await this.feeService.getAllFees(this.tenant.id, this.dateStart, this.dateEnd);
  }

  async getAllPayments(): Promise<any> {
    return await this.paymentService.getAllFees(this.tenant.id, this.dateStart, this.dateEnd);
  }

  setTotal() {
    this.total=this.tenant.balance;
    this.fees.forEach(fee => {
      this.total = Number(this.total) + Number(fee.amount);
    });

    this.payments.forEach(payment => {
      this.total = Number(this.total) - Number(payment.amount);
    });
  }

}
