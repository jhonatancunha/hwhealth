/* eslint-disable camelcase */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import LimiarService from '@components/limiar/limiar.service';
import { ObjectId } from 'mongodb';
import {
  MachineInfo, Battery, MachineData, UserInfo,
} from './schema/machine.schema';
import CreateMachineDto from './dto/create-machine.dto';
import UpdateMachineDto from './dto/update-machine.dto';

@Injectable()
export default class MachineService {
  constructor(
    @InjectModel(MachineInfo.name)
    private MachineInfoModel: Model<MachineInfo>,
    private readonly limiarService: LimiarService,
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

    const foundedMachine = await this.MachineInfoModel.findOne({
      'user_info.uuid': user_info.uuid,
    });

    if (foundedMachine) {
      foundedMachine.updated_at = new Date();
      foundedMachine.data.push({
        fans,
        cpu,
        memory_ram,
        swap_memory,
        disk,
        network,
        battery,
        created_at: new Date(),
      });
    } else {
      const createdMachine = new this.MachineInfoModel({
        user_info,
        user_id: userId,
        updated_at: new Date(),
        data: [
          {
            fans,
            cpu,
            memory_ram,
            swap_memory,
            disk,
            network,
            battery,
            created_at: new Date(),
          },
        ],
      });
      return createdMachine.save();
    }

    const createdLimiar = await this.limiarService.create({
      machine_id: new Types.ObjectId(foundedMachine._id).toString(),
      battery_percentage: 15,
      cpu_temperature: 90,
      disk_storage: 95,
      ram_memory_use: 95,
      swap_memory_use: 95,
    });

    createdLimiar.save();

    return foundedMachine.save();
  }

  async findAll() {
    return this.MachineInfoModel.find().exec();
  }

  async getMachineInfo(machine_id: String) {
    const machineInfo = await this.MachineInfoModel.findById(machine_id).exec();

    if (!machineInfo) {
      throw new Error('Machine not founded');
    }

    const sortedData = machineInfo.data.sort(
      (a, b) => b.created_at.getTime() - a.created_at.getTime(),
    );

    const userInfo = machineInfo.user_info;

    return { userInfo, data: sortedData.slice(0, 5) };
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
