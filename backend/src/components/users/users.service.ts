import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { EProviders, User, UserSchema } from './schema/user.schema';
import UpdateUserDto from './dto/updateUser.dto';
import CreateUserDto from './dto/createUser.dto';

@Injectable()
export default class UsersService {
  constructor(
    @InjectModel(User.name)
    private UserModel: Model<User>,
  ) { }

  /**
   * Cria um novo usuário.
   *
   * @param {CreateUserDto} user - Dados do usuário a ser criado.
   * @return {Promise<User>} - O usuário criado.
   * @throws {BadRequestException} - Se o usuário já existir.
   */
  async create(user: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 0);

    const foundedUser = await this.UserModel.findOne({ email: user.email });

    if (foundedUser) {
      throw new BadRequestException('User already exists');
    }

    const newUser = new this.UserModel({
      password: hashedPassword,
      email: user.email,
      verified: false,
      user_one_signal_id: user.user_one_signal_id,
    });

    return newUser.save();
  }

  /**
   * Retorna um usuário encontrado com base no email.
   *
   * @param {string} email - O email do usuário.
   * @param {boolean} verified - Define se o usuário deve ser verificado (padrão: true).
   * @return {Promise<User>} - O usuário encontrado.
   */
  getByEmail(email: string, verified = true): Promise<User> {
    return this.UserModel.findOne({
      email,
      verified,
    });
  }

  /**
   * Retorna um usuário pelo email e provedor.
   *
   * @param {string} email - O email do usuário.
   * @param {EProviders} provider - O provedor do usuário.
   * @return {Promise<User>} - O usuário encontrado.
   */
  getByEmailAndProvider(email: string, provider: EProviders): Promise<User> {
    return this.UserModel.findOne({
      email,
      provider,
    });
  }

  /**
   * Retorna um usuário pelo ID.
   *
   * @param {ObjectId} id - O ID do usuário.
   * @return {Promise<User>} - O usuário encontrado.
   */
  getById(id: ObjectId): Promise<User> {
    return this.UserModel.findOne({
      _id: id,
    });
  }

  /**
   * Atualiza um usuário pelo ID.
   *
   * @param {ObjectId} id - O ID do usuário.
   * @param {UpdateUserDto} data - Dados para atualização do usuário.
   * @return {Promise<User>} - O usuário atualizado.
   */
  update(id: ObjectId, data: UpdateUserDto): Promise<User> {
    return this.UserModel.findOneAndUpdate({ _id: id }, data);
  }

  /**
   * Retorna todos os usuários.
   *
   * @param {boolean} verified - Define se os usuários devem ser verificados (padrão: true).
   * @return {Promise<User[] | []>} - Lista de usuários encontrados.
   */
  getAll(verified: boolean = true): Promise<User[] | []> {
    return this.UserModel.find({
      where: {
        verified,
      },
    });
  }
}
