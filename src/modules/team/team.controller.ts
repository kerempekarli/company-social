import { Controller, Get, Post, Patch, Delete, Param, ParseIntPipe, Body } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { AssignUserDto } from './dto/assign-user.dto';

@Controller('team')
export class TeamController {
    constructor(private readonly teamService: TeamService) { }

    @Get()
    findAll() {
        return this.teamService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.teamService.findOne(id);
    }

    @Post()
    create(@Body() createTeamDto: CreateTeamDto) {
        return this.teamService.create(createTeamDto);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateTeamDto: UpdateTeamDto) {
        return this.teamService.update(id, updateTeamDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.teamService.remove(id);
    }

    @Patch(':teamId/assign-user')
    assignUserToTeam(@Param('teamId', ParseIntPipe) teamId: number, @Body() assignUserDto: AssignUserDto) {
        return this.teamService.assignUserToTeam(assignUserDto.user_id, teamId);
    }

    @Patch(':teamId/remove-user')
    removeUserFromTeam(@Param('teamId', ParseIntPipe) teamId: number, @Body() assignUserDto: AssignUserDto) {
        return this.teamService.removeUserFromTeam(assignUserDto.user_id, teamId);
    }
}
