import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './config/ormconfig'
import { UserController } from './modules/user/user.controller';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { DepartmentModule } from './modules/department/department.module';
import { TeamModule } from './modules/team/team.module';
import { TeamController } from './modules/team/team.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
  TypeOrmModule.forRoot(ormconfig), UserModule, AuthModule, DepartmentModule, TeamModule
  ],
  controllers: [AppController, UserController, AuthController, TeamController],
  providers: [AppService],
})
export class AppModule { }
