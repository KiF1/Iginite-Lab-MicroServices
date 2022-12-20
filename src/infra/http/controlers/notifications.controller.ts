import { Controller,  Post, Body } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { SendNotification } from '../../../application/UseCases/send-notification';
import { NotificationViewModule } from '../view-models/notification-view-module';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}
  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;
    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });
    return { 
      notification: NotificationViewModule.toHTTP(notification),
    }
  }
}
