// src/modules/post/post.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @Get()
    findAll() {
        return this.postService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.postService.findOne(+id);
    }

    @Post()
    create(@Body() body: any) {
        // body should match Post fields
        return this.postService.create(body);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return this.postService.update(+id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.postService.remove(+id);
    }
}
