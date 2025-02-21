import { IsInt } from 'class-validator';

export class AssignUserDto {
    @IsInt()
    user_id: number;
}
