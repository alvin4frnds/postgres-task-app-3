import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import {User} from './User'

@Entity("todos")
export class Todo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255})
    body: string;

    @Column()
    done: boolean;

    @Column()
    user_id: number = 2;

    @ManyToOne(type => User, user => user.todos, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "user_id" })
    user: User;
}