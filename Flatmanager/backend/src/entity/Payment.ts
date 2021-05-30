import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Tenant } from "./Tenant";

@Entity("Payment")
export class Payment  {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date', default: () => "CURRENT_TIMESTAMP"})
    date: Date;

    @Column({default: 1000})
    amount: number;

    @Column({default: 0})
    activeBalance: number;

    @ManyToOne(type => Tenant, Tenant => Tenant.payment, {
        onDelete: 'CASCADE'})
    tenant: Tenant;

 
}
