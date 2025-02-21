import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateTeamDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsInt()
    department_id?: number;

    @IsOptional()
    @IsInt()
    lead_id?: number;
}
