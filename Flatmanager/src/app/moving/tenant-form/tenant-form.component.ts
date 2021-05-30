import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tenant } from '../../models/tenant';
import { TenantService } from '../../services/tenant.service';
import { ApartmentService } from '../../services/apartment.service';
import { Apartment } from '../../models/apartment';

@Component({
  selector: 'app-tenant-form',
  templateUrl: './tenant-form.component.html',
  styleUrls: ['./tenant-form.component.css']
})
export class TenantFormComponent implements OnInit {

  tenants: Tenant[];
  selectedTenant:Tenant;
  new: boolean;
  apartment: Apartment = null;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private TenantService: TenantService,
    private ApartmentService: ApartmentService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  tenantForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    balance: ['0', Validators.required]
  });


  async ngOnInit() {
    this.tenants = await this.TenantService.getAllTenants();
    this.new = true;
    this.apartment = await (this.ApartmentService.getApartmentWithId(this.activatedRoute.snapshot.queryParamMap.get('id')));

  }

  async addTenant() {
    if (!this.new) {
      this.tenantForm.patchValue({ balance: this.selectedTenant.balance });
      this.tenantForm.patchValue({ name: this.selectedTenant.name});
          }
    //console.log(this.tenantForm.value);
    const tenant=this.tenantForm.value;
    tenant.apartment=this.apartment;
    if (!this.new) tenant.id = this.selectedTenant.id;
    if (this.tenantForm.valid){
    if (confirm("Move in " + tenant.name + " to apartment " + this.apartment.number + "?")){
      await this.TenantService.addTenant(tenant);
      this.router.navigate(['/moving']);
    } 
    this.error="";
    }else this.error="The form is invalid.";
    
  }

  compareTenants(tenant1: Tenant, tenant2: Tenant): boolean {
    return tenant1 && tenant2 && tenant1.id == tenant2.id;
  }

  onChange(index) {
    this.selectedTenant = this.tenants[index];
  }


}
