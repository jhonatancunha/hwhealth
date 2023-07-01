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

  /**
   * Valida um usuário pelo email e senha.
   *
   * @param {string} email - O email do usuário.
   * @param {string} password - A senha do usuário.
   * @return {Promise<null | IAuthValidateUserOutput>} - As informações do usuário validado ou null se a validação falhar.
   * @throws {NotFoundException} - Se o usuário não for encontrado.
   */
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

  /**
   * Valida um usuário pelo email e provedor.
   *
   * @param {string} email - O email do usuário.
   * @param {EProviders} provider - O provedor do usuário.
   * @return {Promise<null | IAuthValidateUserOutput>} - As informações do usuário validado ou null se a validação falhar.
   * @throws {NotFoundException} - Se o usuário não for encontrado.
   */
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

  /**
   * Realiza o login do usuário.
   *
   * @param {IAuthLoginInput} data - Os dados de login do usuário.
   * @return {Promise<IAuthLoginOutput>} - O resultado do login contendo os tokens de acesso e atualização.
   * @throws {NotFoundException} - Se o usuário não existir.
   */
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

  /**
   * Obtém o token de atualização de um usuário pelo email.
   *
   * @param {string} email - O email do usuário.
   * @return {Promise<string>} - O token de atualização.
   */
  getRefreshTokenByEmail(email: string): Promise<string> {
    return this.redisClient.get(email);
  }

  /**
   * Exclui o token de um usuário pelo email.
   *
   * @param {string} email - O email do usuário.
   * @return {Promise<number>} - O número de tokens excluídos.
   */
  deleteTokenByEmail(email: string): Promise<number> {
    return this.redisClient.del(email);
  }

  /**
   * Exclui todos os tokens armazenados.
   *
   * @return {Promise<string>} - O resultado da operação.
   */
  deleteAllTokens(): Promise<string> {
    return this.redisClient.flushall();
  }
}
