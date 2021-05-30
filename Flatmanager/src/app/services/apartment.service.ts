import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apartment } from '../models/apartment';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {

  constructor(private http: HttpClient) { }

  async getAllApartments() {
    return this.http.get<Apartment[]>('/api/apartments').toPromise();
  }

  async getApartmentWithId(id) {
    return this.http.get<Apartment>('/api/apartments/' + id).toPromise();
  }



}
