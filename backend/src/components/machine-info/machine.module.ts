import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JwtModule } from '@nestjs/jwt';
import jwtConstants from '@components/auth/constants';
import { PassportModule } from '@nestjs/passport';
import JwtStrategy from '@components/auth/strategies/jwt.strategy';
import LimiarModule from '@components/limiar/limiar.module';
import LimiarService from '@components/limiar/limiar.service';
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
    LimiarModule,
  ],
  controllers: [MachineController],
  providers: [MachineService, JwtStrategy],
})
export default class MachineModule {}
