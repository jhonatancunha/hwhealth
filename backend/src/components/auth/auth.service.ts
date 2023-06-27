import * as Redis from 'ioredis';
import * as bcrypt from 'bcrypt';

import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '@liaoliaots/nestjs-redis';
import jwtConstants from '@components/auth/constants';

import { IAuthLoginInput } from '@components/auth/interfaces/IAuthLoginInput.interface';
import { IAuthValidateUserOutput } from '@components/auth/interfaces/IAuthValidateUserOutput.interface';
import { IAuthLoginOutput } from '@components/auth/interfaces/IAuthLoginOutput.interface';

import UsersService from '@components/users/users.service';
import { EProviders } from '@components/users/schema/user.schema';

@Injectable()
export default class AuthService {
  private readonly redisClient: Redis.Redis;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {
    this.redisClient = redisService.getClient();
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<null | IAuthValidateUserOutput> {
    const user = await this.usersService.getByEmail(email, false);

    if (!user) {
      throw new NotFoundException('The item does not exist');
    }

    const passwordCompared = await bcrypt.compare(password, user.password);

    if (passwordCompared) {
      return {
        id: user._id,
        email: user.email,
      };
    }

    return null;
  }

  async validateUserByProvider(
    email: string,
    provider: EProviders,
  ): Promise<null | IAuthValidateUserOutput> {
    const user = await this.usersService.getByEmailAndProvider(email, provider);

    if (!user) {
      throw new NotFoundException('The item does not exist');
    }

    return {
      id: user._id,
      email: user.email,
    };
  }

  async login(data: IAuthLoginInput): Promise<IAuthLoginOutput> {
    const foundedUser = await this.validateUser(data.email, data.password);

    const payload = {
      email: foundedUser.email,
      password: data.password,
      id: foundedUser.id,
    };

    if (!foundedUser) {
      throw new NotFoundException('User does not exist');
    }

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: jwtConstants.accessTokenExpirationTime,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: jwtConstants.refreshTokenExpirationTime,
    });

    await this.redisClient.set(payload.email, refreshToken, 'EX', 86400);

    return {
      accessToken,
      refreshToken,
    };
  }

  getRefreshTokenByEmail(email: string): Promise<string> {
    return this.redisClient.get(email);
  }

  deleteTokenByEmail(email: string): Promise<number> {
    return this.redisClient.del(email);
  }

  deleteAllTokens(): Promise<string> {
    return this.redisClient.flushall();
  }
}