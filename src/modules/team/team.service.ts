import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { UserTeam } from './entities/user_team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { User } from '../user/entities/user.entity';
import { Department } from '../department/entities/department.entity';

@Injectable()
export class TeamService {
    constructor(
        @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>,

        @InjectRepository(UserTeam)
        private readonly userTeamRepository: Repository<UserTeam>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Department)
        private readonly departmentRepository: Repository<Department>,
    ) { }

    /**
     * ✅ Tüm takımları getirir (Departman ve lider bilgileri dahil).
     */
    findAll(): Promise<Team[]> {
        return this.teamRepository.find({
            relations: ['department', 'lead', 'userTeams'],
        });
    }

    /**
     * ✅ Belirli bir takımı getirir (Departman ve lider bilgileri dahil).
     */
    async findOne(id: number): Promise<Team> {
        const team = await this.teamRepository.findOne({
            where: { team_id: id },
            relations: ['department', 'lead', 'userTeams'],
        });

        if (!team) throw new NotFoundException(`Team with ID ${id} not found`);
        return team;
    }

    /**
     * ✅ Yeni bir takım oluşturur.
     */
    async create(createTeamDto: CreateTeamDto): Promise<Team> {
        const { department_id, lead_id, ...rest } = createTeamDto;
        const team = this.teamRepository.create(rest);

        if (department_id) {
            const department = await this.departmentRepository.findOne({
                where: { department_id },
            });
            if (!department) throw new NotFoundException(`Department with ID ${department_id} not found`);
            team.department = department;
        }

        if (lead_id) {
            const lead = await this.userRepository.findOne({ where: { user_id: lead_id } });
            if (!lead) throw new NotFoundException(`User with ID ${lead_id} not found`);
            team.lead = lead;
        }

        return this.teamRepository.save(team);
    }

    /**
     * ✅ Bir takımı günceller.
     */
    async update(id: number, updateTeamDto: UpdateTeamDto): Promise<Team> {
        const team = await this.findOne(id);
        const { department_id, lead_id, ...rest } = updateTeamDto;

        if (department_id) {
            const department = await this.departmentRepository.findOne({
                where: { department_id },
            });
            if (!department) throw new NotFoundException(`Department with ID ${department_id} not found`);
            team.department = department;
        }

        if (lead_id) {
            const lead = await this.userRepository.findOne({ where: { user_id: lead_id } });
            if (!lead) throw new NotFoundException(`User with ID ${lead_id} not found`);
            team.lead = lead;
        }

        Object.assign(team, rest);
        return this.teamRepository.save(team);
    }

    /**
     * ✅ Bir takımı siler.
     */
    async remove(id: number): Promise<void> {
        await this.findOne(id);
        await this.teamRepository.delete(id);
    }

    /**
     * ✅ Kullanıcıyı takıma ekler.
     */
    async assignUserToTeam(userId: number, teamId: number): Promise<UserTeam> {
        const user = await this.userRepository.findOne({ where: { user_id: userId } });
        if (!user) throw new NotFoundException(`User with ID ${userId} not found`);

        const team = await this.teamRepository.findOne({ where: { team_id: teamId } });
        if (!team) throw new NotFoundException(`Team with ID ${teamId} not found`);

        const userTeam = this.userTeamRepository.create({ user_id: userId, team_id: teamId });
        return this.userTeamRepository.save(userTeam);
    }

    /**
     * ✅ Kullanıcıyı takımdan çıkarır.
     */
    async removeUserFromTeam(userId: number, teamId: number): Promise<void> {
        const userTeam = await this.userTeamRepository.findOne({
            where: { user_id: userId, team_id: teamId },
        });

        if (!userTeam) {
            throw new NotFoundException(`User with ID ${userId} is not in Team with ID ${teamId}`);
        }

        await this.userTeamRepository.delete({ user_id: userId, team_id: teamId });
    }
}
