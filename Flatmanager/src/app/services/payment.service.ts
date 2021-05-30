import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }


  async getAllFees(idin, dateStartin, dateEndin) {
    return await this.http.get<Payment[]>('/api/payments', {params: {
      id: idin,
      dateStart:dateStartin,
      dateEnd:dateEndin
    }}).toPromise();
  }

  async addPayment(payment: Payment) {
    await this.http.post<Payment>('/api/payments', payment).toPromise();
  }

}
