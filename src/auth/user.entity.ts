import { Column, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import Task from "src/tasks/task.entity";

@Entity()
export default class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column({ unique: true })
    email: string;

    @OneToMany(_type => Task, task => task.user)
    tasks: Task[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}