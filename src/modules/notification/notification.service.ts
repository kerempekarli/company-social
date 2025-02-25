// src/modules/notification/notification.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(Notification)
        private readonly notificationRepo: Repository<Notification>,

        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) { }

    findAll(): Promise<Notification[]> {
        return this.notificationRepo.find({
            relations: ['user', 'sender'],
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: number): Promise<Notification> {
        const notification = await this.notificationRepo.findOne({
            where: { notificationId: id },
            relations: ['user', 'sender'],
        });
        if (!notification) {
            throw new NotFoundException(`Notification #${id} not found`);
        }
        return notification;
    }

    // Create a new notification (requires userId, optionally senderId, etc.)
    async createNotification(data: {
        userId: number;
        senderId?: number;
        message: string;
        notificationType?: string;
        referenceType?: string;
        referenceId?: number;
        extraData?: Record<string, any>;
        priority?: 'low' | 'medium' | 'high';
    }): Promise<Notification> {
        const user = await this.userRepo.findOne({ where: { user_id: data.userId } });
        if (!user) {
            throw new NotFoundException(`User with ID ${data.userId} not found`);
        }

        let sender: User | null = null;
        if (data.senderId) {
            sender = await this.userRepo.findOne({ where: { user_id: data.senderId } });
            if (!sender) {
                throw new NotFoundException(`Sender with ID ${data.senderId} not found`);
            }
        }

        const newNotification = this.notificationRepo.create({
            user,
            sender: sender ?? undefined, // Eğer sender `null` ise `undefined` olarak ata
            message: data.message,
            notificationType: data.notificationType || 'system_alert',
            referenceType: data.referenceType,
            referenceId: data.referenceId,
            extraData: data.extraData,
            priority: data.priority || 'medium',
        });

        return this.notificationRepo.save(newNotification);
    }


    // Mark as read
    async markAsRead(id: number): Promise<Notification> {
        const notification = await this.findOne(id);
        notification.isRead = true;
        return this.notificationRepo.save(notification);
    }

    // Mark multiple notifications for a user
    async markAllReadForUser(userId: number): Promise<void> {
        await this.notificationRepo.update(
            { user: { user_id: userId } },
            { isRead: true },
        );
    }

    async remove(id: number): Promise<void> {
        const notification = await this.findOne(id);
        await this.notificationRepo.remove(notification);
    }

    async findUserNotifications(userId: number): Promise<Notification[]> {
        return this.notificationRepo.find({
            where: { user: { user_id: userId } },
            relations: ['sender'],
            order: { createdAt: 'DESC' }, // En son bildirimleri önce göster
        });
    }

}
