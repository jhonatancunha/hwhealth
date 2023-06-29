import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import NotificationService from './notification.service';
import NotificationController from './notification.controller';
import { Notification, NotificationSchema } from './schema/notification.entity';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Notification.name, schema: NotificationSchema },
  ])],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export default class NotificationModule {}
