// src/modules/comment/comment.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
  ) {}

  findAll(): Promise<Comment[]> {
    return this.commentRepo.find({ relations: ['post', 'user', 'parentComment'] });
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentRepo.findOne({
      where: { commentId: id },
      relations: ['post', 'user', 'parentComment'],
    });
    if (!comment) throw new NotFoundException(`Comment #${id} not found`);
    return comment;
  }

  create(data: Partial<Comment>): Promise<Comment> {
    const comment = this.commentRepo.create(data);
    return this.commentRepo.save(comment);
  }

  async remove(id: number): Promise<void> {
    const comment = await this.findOne(id);
    await this.commentRepo.remove(comment);
  }
}
