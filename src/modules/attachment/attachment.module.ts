// src/modules/attachment/attachment.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attachment } from './entities/attachment.entity';
import { AttachmentService } from './attachment.service';
import { AttachmentController } from './attachment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Attachment])],
  providers: [AttachmentService],
  controllers: [AttachmentController],
  exports: [AttachmentService],
})
export class AttachmentModule {}
