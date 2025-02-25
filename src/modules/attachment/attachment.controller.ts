// src/modules/attachment/attachment.controller.ts
import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { AttachmentService } from './attachment.service';

@Controller('attachments')
export class AttachmentController {
    constructor(private readonly attachService: AttachmentService) { }

    @Get()
    findAll() {
        return this.attachService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.attachService.findOne(+id);
    }

    @Post()
    create(@Body() body: any) {
        return this.attachService.create(body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.attachService.remove(+id);
    }
}
