/* eslint-disable camelcase */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import LimiarService from '@components/limiar/limiar.service';
import {
  MachineInfo,
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
      user_uuid,
      cpu_percentage,
      cpu_mean_temperature,
      ram_percent,
      swap_percent,
      disk_percent,
      packets_sent,
      packets_received,
      battery_charge,
    } = createMachineDto;

    let machine = await this.MachineInfoModel.findOne({
      'user_info.uuid': user_uuid,
    });

    if (machine) {
      machine.updateOne(CreateMachineDto);
      if (machine.cpu.history_cpu_percentage.length === 5) {
        machine.cpu.history_cpu_percentage.pop();
      }
      machine.cpu.history_cpu_percentage.push(cpu_percentage);

      if (machine.cpu.history_cpu_temperature.length === 5) {
        machine.cpu.history_cpu_temperature.pop();
      }
      machine.cpu.history_cpu_temperature.push(cpu_mean_temperature);

      if (machine.cpu.time_labels_cpu_percentage.length === 5) {
        machine.cpu.time_labels_cpu_percentage.pop();
      }
      machine.cpu.time_labels_cpu_percentage.push(new Date());

      if (machine.cpu.time_labels_cpu_temperature.length === 5) {
        machine.cpu.time_labels_cpu_temperature.pop();
      }
      machine.cpu.time_labels_cpu_temperature.push(new Date());

      if (machine.memory_ram.history_percent.length === 5) {
        machine.memory_ram.history_percent.pop();
      }
      machine.memory_ram.history_percent.push(ram_percent);

      if (machine.memory_ram.time_labels_history_percent.length === 5) {
        machine.memory_ram.time_labels_history_percent.pop();
      }
      machine.memory_ram.time_labels_history_percent.push(new Date());

      if (machine.swap_memory.history_percent.length === 5) {
        machine.swap_memory.history_percent.pop();
      }
      machine.swap_memory.history_percent.push(swap_percent);

      if (machine.memory_ram.time_labels_history_percent.length === 5) {
        machine.swap_memory.time_labels_history_percent.pop();
      }
      machine.swap_memory.time_labels_history_percent.push(new Date());

      if (machine.disk.history_percent.length === 5) {
        machine.disk.history_percent.pop();
      }
      machine.disk.history_percent.push(disk_percent);

      if (machine.disk.time_labels_history_percent.length === 5) {
        machine.disk.time_labels_history_percent.pop();
      }
      machine.disk.time_labels_history_percent.push(new Date());

      if (machine.network.history_packets_sent.length === 5) {
        machine.network.history_packets_sent.pop();
      }
      machine.network.history_packets_sent.push(packets_sent);

      if (machine.network.time_labels_history_packets_sent.length === 5) {
        machine.network.time_labels_history_packets_sent.pop();
      }
      machine.network.time_labels_history_packets_sent.push(new Date());

      if (machine.network.history_packets_received.length === 5) {
        machine.network.history_packets_received.pop();
      }
      machine.network.history_packets_received.push(packets_received);

      if (machine.network.time_labels_history_packets_received.length === 5) {
        machine.network.time_labels_history_packets_received.pop();
      }
      machine.network.time_labels_history_packets_received.push(new Date());

      if (machine.battery.history_charge.length === 5) {
        machine.battery.history_charge.pop();
      }
      machine.battery.history_charge.push(battery_charge);

      if (machine.battery.time_labels_history_charge.length === 5) {
        machine.battery.time_labels_history_charge.pop();
      }
      machine.battery.time_labels_history_charge.push(new Date());
    } else {
      machine = new this.MachineInfoModel(createMachineDto);
      machine.cpu.history_cpu_percentage.push(cpu_percentage);
      machine.cpu.time_labels_cpu_percentage.push(new Date());

      machine.cpu.history_cpu_temperature.push(cpu_mean_temperature);
      machine.cpu.time_labels_cpu_temperature.push(new Date());

      machine.memory_ram.history_percent.push(ram_percent);
      machine.memory_ram.time_labels_history_percent.push(new Date());

      machine.swap_memory.history_percent.push(swap_percent);
      machine.swap_memory.time_labels_history_percent.push(new Date());

      machine.disk.history_percent.push(disk_percent);
      machine.disk.time_labels_history_percent.push(new Date());

      machine.network.history_packets_sent.push(packets_sent);
      machine.network.time_labels_history_packets_sent.push(new Date());

      machine.network.history_packets_received.push(packets_received);
      machine.network.time_labels_history_packets_received.push(new Date());

      machine.battery.history_charge.push(battery_charge);
      machine.network.time_labels_history_packets_received.push(new Date());
    }

    const createdLimiar = await this.limiarService.create({
      machine_id: new Types.ObjectId(machine._id).toString(),
      battery_percentage: 15,
      cpu_temperature: 90,
      disk_storage: 95,
      ram_memory_use: 95,
      swap_memory_use: 95,
    });

    createdLimiar.save();

    return machine.save();
  }

  async findAll() {
    return this.MachineInfoModel.find().exec();
  }

  async getMachineInfo(machine_id: String) {
    const machineInfo = await this.MachineInfoModel.findById(machine_id).exec();

    if (!machineInfo) {
      throw new Error('Machine not founded');
    }

    return machineInfo;
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
