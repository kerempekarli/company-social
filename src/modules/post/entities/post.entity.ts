// src/modules/post/entities/post.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn({ name: 'post_id' })
    postId: number;

    @ManyToOne(() => User, (user) => user.posts, { eager: true, onDelete: 'CASCADE' }) // ✅ Kullanıcı bilgisiyle bağladık
    user: User;

    @Column({ nullable: true })
    title: string;

    @Column({ type: 'text' })
    content: string;

    @Column({ nullable: true })
    post_type: string; // e.g. 'text', 'poll', 'event'

    @Column({ nullable: true })
    visibility_scope: string; // e.g. 'public', 'department'

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
