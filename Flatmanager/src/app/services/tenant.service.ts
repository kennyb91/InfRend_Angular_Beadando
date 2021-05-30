import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tenant } from '../models/tenant';

@Injectable({
  providedIn: 'root'
})
export class TenantService {


  constructor(private http: HttpClient) { }
  
  async getAllActiveApartments() {
    return await this.http.get<Tenant[]>('/api/tenants_active').toPromise();
  }

  async getOne(id) {
    return await this.http.get<Tenant>('/api/tenants/'+ id).toPromise();
  }

  async getAllTenants() {
    return await this.http.get<Tenant[]>('/api/tenants').toPromise();
  }

  async moveOutTenant(Tenant:Tenant) {
    const body = {"id": Tenant.id}
    await this.http.put<Tenant>('/api/tenants_move', body).subscribe();
  }

  async addTenant(Tenant:Tenant) {
    return this.http.post<Tenant>('/api/tenants', Tenant).toPromise();
  }

  async updateBalance(tenant: Tenant) {
    await this.http.put<Tenant>('/api/tenants', tenant).subscribe();
  }
 
}
