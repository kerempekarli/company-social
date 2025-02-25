// src/modules/reaction/reaction.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reaction } from './entities/reaction.entity';

@Injectable()
export class ReactionService {
  constructor(
    @InjectRepository(Reaction)
    private readonly reactionRepo: Repository<Reaction>,
  ) {}

  findAll(): Promise<Reaction[]> {
    return this.reactionRepo.find({ relations: ['post', 'user'] });
  }

  async findOne(id: number): Promise<Reaction> {
    const reaction = await this.reactionRepo.findOne({
      where: { reactionId: id },
      relations: ['post', 'user'],
    });
    if (!reaction) throw new NotFoundException(`Reaction #${id} not found`);
    return reaction;
  }

  create(data: Partial<Reaction>): Promise<Reaction> {
    const reaction = this.reactionRepo.create(data);
    return this.reactionRepo.save(reaction);
  }

  async remove(id: number): Promise<void> {
    const reaction = await this.findOne(id);
    await this.reactionRepo.remove(reaction);
  }
}
