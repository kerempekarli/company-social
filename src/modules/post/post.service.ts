// src/modules/post/post.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async findAll(): Promise<Post[]> {
        return this.postRepository.find({
            relations: ['user'], // Kullanıcı bilgilerini çek
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

    async create(data: Partial<Post>): Promise<Post> {
        // ✅ Kullanıcıyı veritabanından getir
        const user = await this.userRepository.findOne({
            where: { user_id: data.user?.user_id },
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${data.user?.user_id} not found`);
        }

        // ✅ Kullanıcı ile post ilişkisini kur
        const newPost = this.postRepository.create({ ...data, user });

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
