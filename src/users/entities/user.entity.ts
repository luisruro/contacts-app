import { Contact } from "src/contacts/entities/contact.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 500 })
    name: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false, select: false })
    password: string;

    @CreateDateColumn()
    creationDate: Date;

    @OneToMany(() => Contact, (contact) => contact.user, {onDelete: 'CASCADE'})
    contacts: Contact[];
}