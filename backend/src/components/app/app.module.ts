import { Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';

import AuthModule from '@components/auth/auth.module';
import UsersModule from '@components/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import MachineModule from '@components/machine-info/machine.module';
import LimiarModule from '@components/limiar/limiar.module';
import NotificationModule from '@components/notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/app'),
    RedisModule.forRoot({
      config: {
        host: 'localhost',
        port: 6379,
      },
    }),
    AuthModule,
    UsersModule,
    MachineModule,
    LimiarModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export default class AppModule { }
