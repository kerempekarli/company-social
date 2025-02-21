// src/modules/role/entities/role.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('role')
export class Role {
    @PrimaryGeneratedColumn()
    role_id: number;

    @Column({ length: 100, unique: true })
    name: string;

    @Column({ length: 255, nullable: true })
    description?: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToMany(() => User, (user) => user.roles)
    users: User[];
}
