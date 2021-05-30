import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany} from "typeorm";
import { Payment } from "./Payment";
import { Fee } from "./Fee";
import { Apartment } from "./Apartment";

@Entity("Tenant")
export class Tenant {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: "John"})
    name: string;

    @Column({default: 0})
    balance: string;

    @OneToOne (() => Apartment, {
        onDelete: 'CASCADE'})
    @JoinColumn()
    apartment: Apartment;

    @OneToMany(type => Fee, Fee => Fee.tenant, {
        cascade: true,
    })
    fee: Fee[];

    @OneToMany(type => Payment, Payment => Payment.tenant, {
        cascade: true,
    })
    payment: Payment[];
 
}
