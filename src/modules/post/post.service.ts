// src/modules/post/post.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
    ) { }

    findAll(): Promise<Post[]> {
        return this.postRepository.find({
            relations: ['user'], // if you want user info
        });
    }

    async findOne(id: number): Promise<Post> {
        const post = await this.postRepository.findOne({
            where: { postId: id },
            relations: ['user'],
        });
        if (!post) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }
        return post;
    }

    create(data: Partial<Post>): Promise<Post> {
        const newPost = this.postRepository.create(data);
        return this.postRepository.save(newPost);
    }

    async update(id: number, data: Partial<Post>): Promise<Post> {
        const post = await this.findOne(id);
        Object.assign(post, data);
        return this.postRepository.save(post);
    }

    async remove(id: number): Promise<void> {
        const post = await this.findOne(id);
        await this.postRepository.remove(post);
    }
}
