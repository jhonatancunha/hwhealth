import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import CreateNotificationDto from './dto/create-notification.dto';
import UpdateNotificationDto from './dto/update-notification.dto';
import { Notification } from './schema/notification.entity';

@Injectable()
export default class NotificationService {
  constructor(@InjectModel(Notification.name)
  private NotificationModel: Model<Notification>) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const notification = await this.NotificationModel.create(createNotificationDto);

    return notification.save();
  }

  async findAll(userId: string) {
    return this.NotificationModel.find({ user_id: userId });
  }
}
