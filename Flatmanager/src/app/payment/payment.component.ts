import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Payment } from '../models/payment';
import { Tenant } from '../models/tenant';
import { PaymentService } from '../services/payment.service';
import { TenantService } from '../services/tenant.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  tenants: Tenant[];
  selectedTenant: Tenant;
  today;
  success;error:string;
  

  constructor(public tenantService: TenantService, 
    public paymentService: PaymentService,
    private formBuilder: FormBuilder,
) { 
    }

  async ngOnInit() {
    this.tenants = await this.tenantService.getAllTenants();
    this.today = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.paymentForm.patchValue({date: this.today});
  }

  paymentForm: FormGroup = this.formBuilder.group({
    tenant: ['', Validators.required],
    amount: [1, Validators.min(1)],
    date:['', Validators.required]
  });

  async addPayment(){
    if (this.paymentForm.valid){
      const payment: Payment=this.paymentForm.value;
      payment.amount=this.paymentForm.value.amount;
      payment.activeBalance= Number(payment.tenant.balance) - Number(payment.amount);
      payment.tenant.balance= payment.activeBalance;
      console.log(payment);
      if (confirm("Do you want to add a payment of " + payment.amount + "EUR,  to the tenant " + payment.tenant.name + " ?")) 
      { await this.paymentService.addPayment(payment);
        await this.tenantService.updateBalance(payment.tenant);
        this.success="Added payment of " + payment.amount + "EUR to tenant " + payment.tenant.name;
        this.error=""
        this.paymentForm.reset();
      }

    }else {
      this.success=""
    this.error="Invalid form!"}

  }

  compareTenants(tenant1: Tenant, tenant2: Tenant): boolean {
    return tenant1 && tenant2 && tenant1.id == tenant2.id;
  }


}
