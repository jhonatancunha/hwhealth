import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import CreateNotificationDto from './dto/create-notification.dto';
import { Notification } from './schema/notification.entity';

@Injectable()
export default class NotificationService {
  constructor(@InjectModel(Notification.name)
  private NotificationModel: Model<Notification>) {}

  /**
   * Cria uma nova notificação.
   *
   * @param {CreateNotificationDto} createNotificationDto - Dados da notificação a ser criada.
   * @return {Promise<Notification>} - A notificação criada.
   */
  async create(createNotificationDto: CreateNotificationDto) {
    const notification = await this.NotificationModel.create(createNotificationDto);

    return notification.save();
  }

  /**
   * Retorna todas as notificações de um determinado usuário.
   *
   * @param {string} userId - ID do usuário.
   * @return {Promise<Notification[]>} - Lista de notificações ordenadas por data de criação.
   */
  async findAll(userId: string) {
    return this.NotificationModel.find({ user_id: userId }).sort({ created_at: -1 });
  }
}
