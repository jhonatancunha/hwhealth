import {
  Controller, Get, Post, Body, Request, UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import JwtAuthGuard from '@guards/jwtAuth.guard';
import NotificationService from './notification.service';
import CreateNotificationDto from './dto/create-notification.dto';
import { Notification } from './schema/notification.entity';

@ApiTags('Notifications')
@ApiBearerAuth()
@Controller('notification')
export default class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @ApiOkResponse({
    type: Notification,
    description: '200. Returns all notifications from a user',
  })
  @ApiUnauthorizedResponse({
    description: '401. UnauthorizedException.',
  })
  @ApiInternalServerErrorResponse({
    description: '500. Internal Server Error.',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    const token = req.headers.authorization.replace('Bearer ', '');
    const { id } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf-8'));

    return this.notificationService.findAll(id);
  }
}
