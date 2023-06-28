import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import UpdateLimiarDto from './dto/update-limiar.dto';
import CreateLimiarDto from './dto/create-limiar.dto';
import Limiar, { LimiarSchema } from './schema/limiar.schema';

@Injectable()
export default class LimiarService {
  constructor(
    @InjectModel(Limiar.name)
    private LimiarModel: Model<Limiar>,
  ) {}

  async create(createLimiarDto: CreateLimiarDto) {
    const createdLimiar = await this.LimiarModel.create(createLimiarDto);

    return createdLimiar.save();
  }

  async findOne(machineId: string) {
    return this.LimiarModel.findOne({ machine_id: machineId });
  }

  async update(
    machineId: string,
    updateLimiar: UpdateLimiarDto,
  ): Promise<void> {
    const foundedLimiar = await this.LimiarModel.findOne({
      machine_id: machineId,
    });

    if (!foundedLimiar) {
      throw new BadGatewayException('Limiar not founded');
    }

    const result = await foundedLimiar.updateOne(updateLimiar).exec();

    if (!result.acknowledged) {
      throw new Error('Update not acknowledged');
    }
  }
}
