import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import jwtConstants from '@components/auth/constants';
import LimiarController from './limiar.controller';
import LimiarService from './limiar.service';
import Limiar, { LimiarSchema } from './schema/limiar.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Limiar.name, schema: LimiarSchema },
    ]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  controllers: [LimiarController],
  providers: [LimiarService],
})
export default class LimiarModule {}
