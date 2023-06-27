import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JwtModule } from '@nestjs/jwt';
import jwtConstants from '@components/auth/constants';
import { PassportModule } from '@nestjs/passport';
import LocalStrategy from '@components/auth/strategies/local.strategy';
import JwtStrategy from '@components/auth/strategies/jwt.strategy';
import { MachineInfo, MachineInfoSchema } from './schema/machine.schema';
import MachineController from './machine.controller';
import MachineService from './machine.service';
import BatteryDto from './dto/battery.dto';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MachineInfo.name, schema: MachineInfoSchema },
    ]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  controllers: [MachineController],
  providers: [MachineService, JwtStrategy],
})
export default class MachineModule {}
