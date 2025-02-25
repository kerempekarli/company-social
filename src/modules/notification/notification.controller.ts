// src/modules/notification/notification.controller.ts
import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Patch,
    Delete,
} from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
    constructor(private readonly notifService: NotificationService) { }

    @Get()
    findAll() {
        return this.notifService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.notifService.findOne(+id);
    }

    // Create a new notification
    @Post()
    create(@Body() body: any) {
        return this.notifService.createNotification(body);
    }

    // Mark a single notification as read
    @Patch(':id/read')
    markAsRead(@Param('id') id: string) {
        return this.notifService.markAsRead(+id);
    }

    // Mark all notifications for a user as read
    @Patch('user/:userId/read-all')
    markAllRead(@Param('userId') userId: string) {
        return this.notifService.markAllReadForUser(+userId);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.notifService.remove(+id);
    }

    @Get('user/:userId')
    findUserNotifications(@Param('userId') userId: number) {
        return this.notifService.findUserNotifications(userId);
    }

}
