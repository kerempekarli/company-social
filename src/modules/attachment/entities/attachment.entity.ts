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
  
    @ManyToOne(() => Post, { nullable: true, onDelete: 'CASCADE' })
    post?: Post;
  
    @ManyToOne(() => Comment, { nullable: true, onDelete: 'CASCADE' })
    comment?: Comment;
  
    @Column({ length: 500 })
    file_url: string; // e.g. 'uploads/abc123.png'
  
    @Column({ length: 255, nullable: true })
    file_name?: string;
  
    @Column({ length: 50, nullable: true })
    file_type?: string;
  
    @Column({ type: 'int', nullable: true })
    file_size?: number; // in bytes
  
    @CreateDateColumn()
    created_at: Date;
  }
  