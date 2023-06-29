import { Inject, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JwtModule } from '@nestjs/jwt';
import jwtConstants from '@components/auth/constants';
import { PassportModule } from '@nestjs/passport';
import JwtStrategy from '@components/auth/strategies/jwt.strategy';
import LimiarModule from '@components/limiar/limiar.module';
// eslint-disable-next-line import/no-extraneous-dependencies
import { OneSignalModule } from 'onesignal-api-client-nest';
import { ConfigService } from '@nestjs/config';
import UsersModule from '@components/users/users.module';
import { MachineInfo, MachineInfoSchema } from './schema/machine.schema';
import MachineController from './machine.controller';
import MachineService from './machine.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MachineInfo.name, schema: MachineInfoSchema },
    ]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
    OneSignalModule.forRootAsync({
      useFactory: async () => {
        return {
          appId: process.env.APP_ID,
          restApiKey: process.env.REST_API_KEY,
        };
      },
      inject: [ConfigService],
    }),
    LimiarModule,
    UsersModule,
  ],
  controllers: [MachineController],
  providers: [MachineService, JwtStrategy],
})
export default class MachineModule {}
