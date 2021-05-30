import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fee } from '../models/fee';

@Injectable({
  providedIn: 'root'
})
export class FeeService {

  constructor(public http: HttpClient) { }

  async getAllFees(idin, dateStartin, dateEndin) {
    return await this.http.get<Fee[]>('/api/fees', {params: {
      id: idin,
      dateStart:dateStartin,
      dateEnd:dateEndin
    }}).toPromise();
  }

  async addFee(fee: Fee) {
    await this.http.post<Fee>('/api/fees', fee).toPromise();
  }

}
