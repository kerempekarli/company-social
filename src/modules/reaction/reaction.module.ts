// src/modules/reaction/reaction.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reaction } from './entities/reaction.entity';
import { ReactionService } from './reaction.service';
import { ReactionController } from './reaction.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Reaction])],
    providers: [ReactionService],
    controllers: [ReactionController],
    exports: [ReactionService],
})
export class ReactionModule { }
