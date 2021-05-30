import {Entity, PrimaryGeneratedColumn, Column,} from "typeorm";

@Entity("Apartment")
export class Apartment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: "1/A"})
    number: string;

    @Column({default: 100})
    floorArea: number;

    @Column({default: 200})
    airSpace:number;

}
