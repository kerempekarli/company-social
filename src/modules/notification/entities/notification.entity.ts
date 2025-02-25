// src/modules/notification/entities/notification.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { User } from 'src/modules/user/entities/user.entity';
  
  @Entity('notifications')
  export class Notification {
    @PrimaryGeneratedColumn({ name: 'notification_id' })
    notificationId: number;
  
    @ManyToOne(() => User, { onDelete: 'CASCADE', eager: false })
    user: User; // The user who receives the notification
  
    @ManyToOne(() => User, { nullable: true, onDelete: 'CASCADE', eager: false })
    sender?: User; // The user who triggered/sent the notification (optional)
  
    @Column({ length: 255 })
    message: string;
  
    @Column({ name: 'notification_type', length: 50, default: 'system_alert' })
    notificationType: string; // e.g. like, comment, system_alert
  
    @Column({ name: 'reference_type', length: 50, nullable: true })
    referenceType?: string; // e.g. post, comment, event
  
    @Column({ name: 'reference_id', type: 'bigint', nullable: true })
    referenceId?: number; // The ID of that post/comment/event
  
    @Column({ name: 'extra_data', type: 'json', nullable: true })
    extraData?: Record<string, any>; // store additional info in JSON
  
    @Column({ name: 'is_read', default: false })
    isRead: boolean;
  
    @Column({
      type: 'enum',
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    })
    priority: 'low' | 'medium' | 'high';
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  }
  