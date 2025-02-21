import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Team } from '../../team/entities/team.entity';

@Entity('department')
export class Department {
    @PrimaryGeneratedColumn()
    department_id: number;

    @Column({ length: 100 })
    name: string;

    @OneToMany(() => Team, (team) => team.department)
    teams: Team[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
