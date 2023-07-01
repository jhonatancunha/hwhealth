import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import UpdateLimiarDto from './dto/update-limiar.dto';
import CreateLimiarDto from './dto/create-limiar.dto';
import Limiar from './schema/limiar.schema';

@Injectable()
export default class LimiarService {
  constructor(
    @InjectModel(Limiar.name)
    private LimiarModel: Model<Limiar>,
  ) {}

  /**
   * Cria um novo limiar.
   *
   * @param {CreateLimiarDto} createLimiarDto - Dados do limiar a ser criado.
   * @return {Promise<Limiar>} - O limiar criado.
   */
  async create(createLimiarDto: CreateLimiarDto) {
    const createdLimiar = await this.LimiarModel.create(createLimiarDto);

    return createdLimiar.save();
  }

  /**
   * Retorna um limiar com base no ID da máquina.
   *
   * @param {string} machineId - ID da máquina.
   * @return {Promise<Limiar>} - O limiar encontrado.
   */
  async findOne(machineId: string) {
    return this.LimiarModel.findOne({ machine_id: machineId });
  }

  /**
   * Atualiza um limiar com base no ID da máquina.
   *
   * @param {string} machineId - ID da máquina.
   * @param {UpdateLimiarDto} updateLimiar - Dados de atualização do limiar.
   * @return {Promise<void>}
   * @throws {BadGatewayException} - Se o limiar não for encontrado.
   * @throws {Error} - Se a atualização não for confirmada.
   */
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
