import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tenant } from '../models/tenant';
import { TenantService } from '../services/tenant.service';

@Component({
  selector: 'app-request-report',
  templateUrl: './request-report.component.html',
  styleUrls: ['./request-report.component.css']
})
export class RequestReportComponent implements OnInit {

  tenant: Tenant=null;
  tenants: Tenant[];
  today; startDefault;
  dateStart: Date=null;
  dateEnd: Date=null;
  error:string;
  general=false;

  dateForm: FormGroup = this.formBuilder.group({
    tenant: ['', Validators.required],
    dateStart: ['', Validators.required],
    dateEnd: ['this.today', Validators.required]
  });

  constructor(public tenantService:TenantService, public formBuilder: FormBuilder, public router:Router) { }

  async ngOnInit() {
    this.tenants = await this.tenantService.getAllTenants();
    this.today = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.dateEnd=this.today;
    this.dateForm.patchValue({dateEnd: this.today});
    this.startDefault= formatDate(new Date('1990-01-01'), 'yyyy-MM-dd', 'en')
    this.dateStart=this.startDefault;
  }

  compareTenants(tenant1: Tenant, tenant2: Tenant): boolean {
    return tenant1 && tenant2 && tenant1.id == tenant2.id;
  }

  onChange(index) {
    this.tenant = this.tenants[index];
  }

  onPick() {
    this.dateStart=this.dateForm.value.dateStart;
    this.dateEnd=this.dateForm.value.dateEnd;
  }

  getIndividualReport(id, dateStart, dateEnd) {
    if (this.dateForm.valid) {
    this.router.navigate(['/individual-report'], {
      queryParams: { id, dateStart, dateEnd}
    });
    this.error="";
  }
  else this.error="The form is invalid";
  }

  getReport(dateStart, dateEnd) {
    this.dateForm.patchValue({tenant: 'all'});
    if (this.dateForm.valid) {
    this.router.navigate(['/general-report'], {
      queryParams: { dateStart, dateEnd }
    });
    this.error="";
  }
  else this.error="The form is invalid";
  }


}
