import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import {Todo} from './Todo';

@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255})
    name: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", name: "created_at"})
    created_at: string;

    @Column({ type: "timestamp", onUpdate: "CURRENT_TIMESTAMP()", name: "updated_at"})
    updated_at: string;

    @OneToMany(type => Todo, todo => todo.user)
    todos: Todo[];
}