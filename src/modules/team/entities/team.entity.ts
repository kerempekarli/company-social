import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Department } from '../../department/entities/department.entity';
import { User } from '../../user/entities/user.entity';
import { UserTeam } from './user_team.entity';

@Entity('team')
export class Team {
    @PrimaryGeneratedColumn()
    team_id: number;

    @Column({ length: 100 })
    name: string;

    @ManyToOne(() => Department, (department) => department.teams, { nullable: true, onDelete: 'SET NULL' })
    department: Department;

    @ManyToOne(() => User, (user) => user.teamsLead, { nullable: true, onDelete: 'SET NULL' })
    lead: User;

    @OneToMany(() => UserTeam, (userTeam) => userTeam.team)
    userTeams: UserTeam[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
