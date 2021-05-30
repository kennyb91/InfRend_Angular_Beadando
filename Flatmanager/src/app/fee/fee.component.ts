import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TenantService } from '../services/tenant.service';
import { FeeService } from '../services/fee.service';
import { Tenant } from '../models/tenant';
import { Fee } from '../models/fee';

@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.css']
})
export class FeeComponent implements OnInit {

  tenants: Tenant[];
  shared: boolean;
  today;
  success; error: string;

  constructor(public tenantService: TenantService,
    public feeService: FeeService,
    private formBuilder: FormBuilder) { }

  async ngOnInit() {
    this.today = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.shared = true;
    this.feeForm.patchValue({ date: this.today });
    this.tenants = await this.tenantService.getAllActiveApartments();
    //this.fees = new Array(this.tenants.length).fill('');
  }


  feeForm: FormGroup = this.formBuilder.group({
    amount: [1, Validators.min(1)],
    description: ['', Validators.required],
    date: ['', Validators.required]
  });


  async addFee() {
    const baseFee: Fee = this.feeForm.value;
    if (this.feeForm.valid) {
      if (confirm("Add fees to active tenants?")) {
        try {
          var amount: number[] = [0];
          if (this.shared) {
            //shared cost divided by the floorAreas
            var totalArea = 0;


            this.tenants.forEach(tenant => {
              totalArea = totalArea + tenant.apartment.floorArea;
            });
            console.log(totalArea);

            for (let index = 0; index < this.tenants.length; index++) {
              var measure = this.tenants[index].apartment.floorArea / totalArea;
              amount[index] = baseFee.amount * measure;
              console.log(amount[index]);
            }

            if (confirm(this.processFeeShared(amount))) {
              for (let index = 0; index < this.tenants.length; index++) {
                var measure = this.tenants[index].apartment.floorArea / totalArea;
                var fee = await this.createFee(baseFee, this.tenants[index], measure);
                this.tenants[index].balance = Number(this.tenants[index].balance) + Number(fee.amount);
                await this.feeService.addFee(fee);
                await this.tenantService.updateBalance(this.tenants[index]);
                baseFee.amount = baseFee.amount / measure;

              }
              this.feeForm.reset();
            }

          } else {
            //general cost multiplied by the floor area

            for (let index = 0; index < this.tenants.length; index++) {
              var measure = this.tenants[index].apartment.floorArea;
              amount[index] = baseFee.amount * measure;
              console.log(amount[index]);
            }

            if (confirm(this.processFeeShared(amount))) {
              for (let index = 0; index < this.tenants.length; index++) {
                var measure = this.tenants[index].apartment.floorArea;
                var fee = await this.createFee(baseFee, this.tenants[index], measure);
                this.tenants[index].balance = Number(this.tenants[index].balance) + Number(fee.amount);
                await this.feeService.addFee(fee);
                await this.tenantService.updateBalance(this.tenants[index]);
                baseFee.amount = fee.amount / measure;
              }
              this.feeForm.reset
            }
          }
          this.success = "Successfully added fees to active tenants";
          this.error = "";
        } catch (err) {
          this.success = "";
          this.error = err.message;
        }
      }
    }
    else {
      this.success = ""
      this.error = "Invalid form!";
    }
  }


  async createFee(fee: Fee, tenant: Tenant, measure: number): Promise<Fee> {
    var localFee: Fee = fee;
    localFee.amount = fee.amount * measure;
    localFee.tenant = tenant;
    return localFee;
  }

  processFeeShared(amount: number[]) {
    var confirmMessage: string = "Adding new fees to current tenants: \n";
    for (let index = 0; index < this.tenants.length; index++) {
      confirmMessage = confirmMessage + this.tenants[index].name + ": " + amount[index] + "EUR\n";
    }

    return confirmMessage;

  }
}
