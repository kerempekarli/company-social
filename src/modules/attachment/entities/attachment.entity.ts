// src/modules/attachment/entities/attachment.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
} from 'typeorm';
import { Post } from 'src/modules/post/entities/post.entity';
import { Comment } from 'src/modules/comment/entities/comment.entity';

@Entity('attachments')
export class Attachment {
    @PrimaryGeneratedColumn({ name: 'attachment_id' })
    attachmentId: number;

    @ManyToOne(() => Post, { eager: false, nullable: true })
    post?: Post;

    @ManyToOne(() => Comment, { eager: false, nullable: true })
    comment?: Comment;

    @Column()
    file_url: string;

    @Column({ nullable: true })
    file_name?: string;

    @Column({ nullable: true })
    file_type?: string;

    @CreateDateColumn()
    created_at: Date;
}
