import { Component, OnInit } from '@angular/core';
import { Apartment } from '../models/apartment';
import { Tenant } from '../models/tenant';
import {ApartmentService} from '../services/apartment.service';

@Component({
  selector: 'app-moving',
  templateUrl: './moving.component.html',
  styleUrls: ['./moving.component.css']
})
export class MovingComponent implements OnInit {

  apartments: Apartment[];

  constructor(private ApartmentService: ApartmentService) { }

  async ngOnInit(): Promise<void> { 
    this.apartments = await this.ApartmentService.getAllApartments();
  }

  

}
