import { Tenant } from './tenant';

export interface Payment {
    id: number;
    date: Date;
    amount: number;
    activeBalance: number;
    tenant:Tenant;
}