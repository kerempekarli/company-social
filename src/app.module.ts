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
import { PostModule } from './modules/post/post.module';
import { AttachmentModule } from './modules/attachment/attachment.module';
import { CommentModule } from './modules/comment/comment.module';
import { ReactionModule } from './modules/reaction/reaction.module';
import { DepartmentController } from './modules/department/department.controller';
import { PostController } from './modules/post/post.controller';
import { AttachmentController } from './modules/attachment/attachment.controller';
import { CommentController } from './modules/comment/comment.controller';
import { ReactionController } from './modules/reaction/reaction.controller';
import { NotificationModule } from './modules/notification/notification.module';
import { NotificationController } from './modules/notification/notification.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
  TypeOrmModule.forRoot(ormconfig), UserModule, AuthModule, DepartmentModule, TeamModule, PostModule, AttachmentModule,
    CommentModule, ReactionModule, NotificationModule

  ],
  controllers: [AppController, UserController, AuthController, TeamController, DepartmentController,
    PostController,
    AttachmentController,
    CommentController,
    ReactionController,
    NotificationController],
  providers: [AppService],
})
export class AppModule { }
