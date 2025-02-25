// src/modules/comment/comment.controller.ts
import { Controller, Get, Post, Param, Delete, Body } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) { }

    @Get()
    findAll() {
        return this.commentService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.commentService.findOne(+id);
    }

    @Post()
    create(@Body() body: any) {
        return this.commentService.create(body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.commentService.remove(+id);
    }
}
