// src/modules/reaction/reaction.controller.ts
import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { ReactionService } from './reaction.service';

@Controller('reactions')
export class ReactionController {
    constructor(private readonly reactionService: ReactionService) { }

    @Get()
    findAll() {
        return this.reactionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.reactionService.findOne(+id);
    }

    @Post()
    create(@Body() body: any) {
        return this.reactionService.create(body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.reactionService.remove(+id);
    }
}
