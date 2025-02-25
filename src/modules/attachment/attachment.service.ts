// src/modules/attachment/attachment.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attachment } from './entities/attachment.entity';

@Injectable()
export class AttachmentService {
  constructor(
    @InjectRepository(Attachment)
    private readonly attachRepo: Repository<Attachment>,
  ) {}

  findAll(): Promise<Attachment[]> {
    return this.attachRepo.find({ relations: ['post', 'comment'] });
  }

  async findOne(id: number): Promise<Attachment> {
    const attach = await this.attachRepo.findOne({
      where: { attachmentId: id },
      relations: ['post', 'comment'],
    });
    if (!attach) throw new NotFoundException(`Attachment #${id} not found`);
    return attach;
  }

  create(data: Partial<Attachment>): Promise<Attachment> {
    const attach = this.attachRepo.create(data);
    return this.attachRepo.save(attach);
  }

  async remove(id: number): Promise<void> {
    const attach = await this.findOne(id);
    await this.attachRepo.remove(attach);
  }
}
