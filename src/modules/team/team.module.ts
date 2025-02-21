import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { UserTeam } from './entities/user_team.entity';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { User } from '../user/entities/user.entity';
import { Department } from '../department/entities/department.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Team, UserTeam, User, Department])],
    controllers: [TeamController],
    providers: [TeamService],
    exports: [TeamService],
})
export class TeamModule { }
