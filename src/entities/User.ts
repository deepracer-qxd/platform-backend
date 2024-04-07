import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Model} from "./Model";
import {ROLE} from "./Role";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    name: string

    @Column({type: 'text', unique: true})
    email: string

    @Column({type: 'text'})
    password: string

    @OneToMany(() => Model, (model) => model.user)
    models: Model[]

    @Column({type: "text"})
    role: string
}