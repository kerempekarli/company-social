// src/modules/attachment/attachment.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attachment } from './entities/attachment.entity';
import { Post } from 'src/modules/post/entities/post.entity';
import { Comment } from 'src/modules/comment/entities/comment.entity';

@Injectable()
export class AttachmentService {
  constructor(
    @InjectRepository(Attachment)
    private readonly attachRepo: Repository<Attachment>,
    // If you need to fetch post/comment to verify, you might inject them as well:
    // @InjectRepository(Post) private readonly postRepo: Repository<Post>,
    // @InjectRepository(Comment) private readonly commentRepo: Repository<Comment>,
  ) { }

  findAll(): Promise<Attachment[]> {
    return this.attachRepo.find({ relations: ['post', 'comment'] });
  }

  async findOne(id: number): Promise<Attachment> {
    const attach = await this.attachRepo.findOne({
      where: { attachmentId: id },
      relations: ['post', 'comment'],
    });
    if (!attach) {
      throw new NotFoundException(`Attachment #${id} not found`);
    }
    return attach;
  }

  // This method is called after the file is physically saved by Multer
  async create(data: Partial<Attachment>): Promise<Attachment> {
    const attachment = this.attachRepo.create(data);
    return this.attachRepo.save(attachment);
  }

  async remove(id: number): Promise<void> {
    const attach = await this.findOne(id);
    await this.attachRepo.remove(attach);
  }
}
