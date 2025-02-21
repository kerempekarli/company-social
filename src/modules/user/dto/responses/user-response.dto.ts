    // src/modules/users/dto/responses/user-response.dto.ts

import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  department?: string;

  @Expose()
  status: string;

  @Exclude()
  password?: string; // Şifre API response içinde gizlenecek
}
    