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

  getByEmail(email: string, verified = true): Promise<User> {
    return this.UserModel.findOne({
      email,
      verified,
    });
  }

  getByEmailAndProvider(email: string, provider: EProviders): Promise<User> {
    return this.UserModel.findOne({
      email,
      provider,
    });
  }

  getById(id: ObjectId): Promise<User> {
    return this.UserModel.findOne({
      _id: id,
    });
  }

  update(id: ObjectId, data: UpdateUserDto): Promise<User> {
    return this.UserModel.findOneAndUpdate({ _id: id }, data);
  }

  getAll(verified: boolean = true): Promise<User[] | []> {
    return this.UserModel.find({
      where: {
        verified,
      },
    });
  }
}
