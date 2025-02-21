// src/users/dto/create-user.dto.ts
export class CreateUserDto {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  office_id?: number;
  status?: string;
  profile_picture_url?: string;
}