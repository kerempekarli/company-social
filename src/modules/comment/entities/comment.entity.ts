// src/modules/comment/entities/comment.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
} from 'typeorm';
import { Post } from 'src/modules/post/entities/post.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn({ name: 'comment_id' })
    commentId: number;

    @ManyToOne(() => Post, (post) => post.postId, { eager: false })
    post: Post;

    @ManyToOne(() => User, (user) => user.user_id, { eager: false })
    user: User;

    @Column({ type: 'text' })
    content: string;

    @ManyToOne(() => Comment)
    parentComment?: Comment;

    @CreateDateColumn()
    created_at: Date;
}
