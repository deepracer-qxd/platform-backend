import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity('models')
export class Model {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    name: string

    @Column({type: 'text', unique: true})
    track_name: string

    @Column({type: 'date'})
    created_at: Date

    @Column({type: 'date'})
    updated_at: Date

    @Column({type: 'text'})
    minio_data_path: string

    @ManyToOne(() => User)
    user: User
}