import { Apartment } from "./apartment"

export interface Tenant{
    id: number;
    name: string;
    balance:number;
    apartment:Apartment;
}