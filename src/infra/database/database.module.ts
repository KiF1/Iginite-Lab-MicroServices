import { Module } from "@nestjs/common";
import { PrismaService } from './prisma/prisma.service';
import { NotificationsRepository } from '../../application/repositories/notification-repository';
import { PrismaNotificationRepository } from './prisma/repositories/prisma-notification-repository';

2 ;@Module({
  providers: [PrismaService, {
    provide: NotificationsRepository,
    useClass: PrismaNotificationRepository,
  }],
  exports: [NotificationsRepository],
})

export class DatabaseModule {}