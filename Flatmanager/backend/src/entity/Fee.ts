
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Tenant } from "./Tenant";

@Entity("Fee")
export class Fee {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date', default: () => "CURRENT_TIMESTAMP"})
    date: Date;

    @Column({default: 1000})
    amount: number;

    @Column({default: "Renovation"})
    description: string;

    @ManyToOne(type => Tenant, Tenant => Tenant.fee, {
        onDelete: 'CASCADE'})
    tenant: Tenant;

 
}
