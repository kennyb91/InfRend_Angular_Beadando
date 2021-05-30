import { Tenant } from './tenant';

export interface Fee {
    id: number;
    date: Date;
    amount: number;
    description: string;
    tenant:Tenant;
}