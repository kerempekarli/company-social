// src/modules/reaction/entities/reaction.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
} from 'typeorm';
import { Post } from 'src/modules/post/entities/post.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('reactions')
export class Reaction {
    @PrimaryGeneratedColumn({ name: 'reaction_id' })
    reactionId: number;

    @ManyToOne(() => Post, { eager: false })
    post: Post;

    @ManyToOne(() => User, { eager: false })
    user: User;

    @Column()
    reaction_type: string; // e.g. 'like', 'love'

    @CreateDateColumn()
    created_at: Date;
}
