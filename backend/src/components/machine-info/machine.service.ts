/* eslint-disable camelcase */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MachineInfo, Battery, MachineData } from './schema/machine.schema';
import CreateMachineDto from './dto/create-machine.dto';
import UpdateMachineDto from './dto/update-machine.dto';

@Injectable()
export default class MachineService {
  constructor(
    @InjectModel(MachineInfo.name)
    private MachineInfoModel: Model<MachineInfo>,
  ) {}

  async create(userId: String, createMachineDto: CreateMachineDto) {
    const {
      user_info,
      fans,
      cpu,
      memory_ram,
      swap_memory,
      disk,
      network,
      battery,
    } = createMachineDto;

    const foundedMachine = await this.MachineInfoModel.findOne({ 'user_info.uuid': user_info.uuid });

    if (foundedMachine) {
      foundedMachine.data.push({
        fans, cpu, memory_ram, swap_memory, disk, network, battery, created_at: new Date(),
      });
    } else {
      const createdMachine = new this.MachineInfoModel({
        user_info,
        user_id: userId,
        data: [{
          fans, cpu, memory_ram, swap_memory, disk, network, battery, created_at: new Date(),
        }],
      });
      return createdMachine.save();
    }

    return foundedMachine.save();
  }

  async findAll() {
    return this.MachineInfoModel.find().exec();
  }

  async getMachineInfo(machine_id: String): Promise<MachineData[]> {
    const machineInfo = await this.MachineInfoModel
      .findById(machine_id)
      .exec();

    if (!machineInfo) {
      throw new Error('Registro não encontrado');
    }

    const sortedData = machineInfo.data.sort(
      (a, b) => b.created_at.getTime() - a.created_at.getTime(),
    );

    return sortedData.slice(0, 5);
  }

  async findOne(id: string) {
    return this.MachineInfoModel.findById(id).exec();
  }

  async update(id: string, updateMachineDto: UpdateMachineDto) {
    return this.MachineInfoModel.findByIdAndUpdate(id, updateMachineDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.MachineInfoModel.findByIdAndRemove(id);
  }
}
