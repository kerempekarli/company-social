import {
    Entity,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Team } from './team.entity';

@Entity('user_team')
export class UserTeam {
    @PrimaryColumn()
    user_id: number;

    @PrimaryColumn()
    team_id: number;

    @ManyToOne(() => User, (user) => user.userTeams, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Team, (team) => team.userTeams, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'team_id' })
    team: Team;
}
