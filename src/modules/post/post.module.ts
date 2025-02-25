// src/modules/post/post.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostService } from './post.service';
import { PostController } from './post.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Post])],
    providers: [PostService],
    controllers: [PostController],
    exports: [PostService],
})
export class PostModule { }
