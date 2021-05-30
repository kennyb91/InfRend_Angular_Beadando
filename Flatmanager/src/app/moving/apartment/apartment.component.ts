import { Component, Input, OnInit } from '@angular/core';
import { Apartment } from 'src/app/models/apartment';
import { Tenant } from 'src/app/models/tenant';
import { TenantService } from 'src/app/services/tenant.service';
import { faUserSlash, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.css']
})
export class ApartmentComponent implements OnInit {

  @Input() apartment: Apartment;
  tenants: Tenant[];
  exists = false;
  tenant: Tenant;
  faUserPlus = faUserPlus;
  faUserSlash = faUserSlash;

  constructor(public TenantService: TenantService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.tenants = await this.TenantService.getAllActiveApartments();
    this.findActiveTenant();
  }

  findActiveTenant() {
    try {
      this.tenants.forEach(Tenant => {
        if (this.apartment.id == Tenant.apartment.id) {
          this.exists = true;
          this.tenant = Tenant;
          return;
        }
      });
    } catch (error) {
      console.error();
    }
  }

  async removeTenant() {
    if (confirm("Move out " + this.tenant.name + " from " + this.apartment.number + "?")) {
      await this.TenantService.moveOutTenant(this.tenant);
      this.ngOnInit();
    }
    return;
  }

  addTenantTo(id) {
    this.router.navigate(['/tenant-form'], {
      queryParams: { id }
    });
  }

}
