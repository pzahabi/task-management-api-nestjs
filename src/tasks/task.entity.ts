import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from "src/auth/user.entity";
import { Exclude } from "class-transformer";
import { TaskPriority, TaskStatus } from "src/constants/enums";

@Entity()
export default class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;
    
    @Column()
    priority: TaskPriority;

    @Column()
    duedate: Date;

    @ManyToOne(_type => User, user => user.tasks, { eager: true })
    @Exclude({ toPlainOnly: true })
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}