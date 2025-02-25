// src/modules/attachment/attachment.controller.ts
import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Delete,
    UseInterceptors,
    UploadedFile,
    BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AttachmentService } from './attachment.service';
import { Attachment } from './entities/attachment.entity';
import { extname } from 'path';

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

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.attachService.remove(+id);
    }

    // ------------------------------
    // 🔥 REALISTIC FILE UPLOAD
    // ------------------------------
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                // e.g. change the filename
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = extname(file.originalname);
                const filename = file.fieldname + '-' + uniqueSuffix + ext;
                cb(null, filename);
            },
        }),
        limits: {
            fileSize: 5 * 1024 * 1024, // e.g. 5 MB limit
        },
    }))
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Body() body: any,
    ) {
        if (!file) {
            throw new BadRequestException('No file uploaded');
        }

        // body may contain { postId, commentId } if you want to link them
        const { postId, commentId } = body;

        const attachmentData: Partial<Attachment> = {
            file_url: `uploads/${file.filename}`,
            file_name: file.originalname,
            file_type: file.mimetype,
            file_size: file.size,
        };

        // If linking to post
        if (postId) {
            attachmentData.post = { postId: +postId } as any; // minimal object
        }
        // If linking to comment
        if (commentId) {
            attachmentData.comment = { commentId: +commentId } as any;
        }

        return this.attachService.create(attachmentData);
    }
}
