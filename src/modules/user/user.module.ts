// src/modules/users/users.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { RoleModule } from '../role/role.module';
import { Role } from '../role/entities/role.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Role]), RoleModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService], // Auth modülü burayı kullanacağı için export ettik
})
export class UserModule { }
