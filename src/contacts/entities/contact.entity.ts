import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('contacts')
export class Contact {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 500 })
    name: string;

    @Column({type: 'varchar'})
    phone: string;

    @ManyToOne(() => User, user => user.contacts, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'userId' })
    user: User
}