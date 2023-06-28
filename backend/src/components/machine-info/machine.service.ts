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

  async create(userId: string, createMachineDto: CreateMachineDto): Promise<MachineInfo> {
    const {
      cpu, memory_ram, swap_memory, disk, network, battery,
    } = createMachineDto;

    // await this.MachineInfoModel.deleteMany({});

    let machine = await this.MachineInfoModel.findOne({
      user_id: userId,
    });

    if (machine) {
      await machine.updateOne({
        $push: {
          ...createMachineDto,
        },
      });

      if (machine.cpu[0].history_cpu_percentage.length === 5) {
        machine.cpu[0].history_cpu_percentage.pop();
      }
      machine.cpu[0].history_cpu_percentage.push(cpu.cpu_percentage);

      if (machine.cpu[0].history_cpu_temperature.length === 5) {
        machine.cpu[0].history_cpu_temperature.pop();
      }
      machine.cpu[0].history_cpu_temperature.push(cpu.cpu_mean_temperature);

      if (machine.cpu[0].time_labels_cpu_percentage.length === 5) {
        machine.cpu[0].time_labels_cpu_percentage.pop();
      }
      machine.cpu[0].time_labels_cpu_percentage.push(new Date());

      if (machine.cpu[0].time_labels_cpu_temperature.length === 5) {
        machine.cpu[0].time_labels_cpu_temperature.pop();
      }
      machine.cpu[0].time_labels_cpu_temperature.push(new Date());

      if (machine.memory_ram[0].history_percent.length === 5) {
        machine.memory_ram.history_percent.pop();
      }
      machine.memory_ram[0].history_percent.push(memory_ram.percent);

      if (machine.memory_ram[0].time_labels_history_percent.length === 5) {
        machine.memory_ram.time_labels_history_percent.pop();
      }
      machine.memory_ram[0].time_labels_history_percent.push(new Date());

      if (machine.swap_memory[0].history_percent.length === 5) {
        machine.swap_memory[0].history_percent.pop();
      }
      machine.swap_memory[0].history_percent.push(swap_memory.percent);

      if (machine.swap_memory[0].time_labels_history_percent.length === 5) {
        machine.swap_memory[0].time_labels_history_percent.pop();
      }
      machine.swap_memory[0].time_labels_history_percent.push(new Date());

      if (machine.disk[0].history_percent.length === 5) {
        machine.disk[0].history_percent.pop();
      }
      machine.disk[0].history_percent.push(disk.percent);

      if (machine.disk[0].time_labels_history_percent.length === 5) {
        machine.disk[0].time_labels_history_percent.pop();
      }
      machine.disk[0].time_labels_history_percent.push(new Date());

      if (machine.network[0].history_packets_sent.length === 5) {
        machine.network[0].history_packets_sent.pop();
      }
      machine.network[0].history_packets_sent.push(network.packets_sent);

      if (machine.network[0].time_labels_history_packets_sent.length === 5) {
        machine.network[0].time_labels_history_packets_sent.pop();
      }
      machine.network[0].time_labels_history_packets_sent.push(new Date());

      if (machine.network[0].history_packets_received.length === 5) {
        machine.network[0].history_packets_received.pop();
      }
      machine.network[0].history_packets_received.push(network.packets_received);

      if (machine.network[0].time_labels_history_packets_received.length === 5) {
        machine.network[0].time_labels_history_packets_received.pop();
      }
      machine.network[0].time_labels_history_packets_received.push(new Date());

      if (machine.battery[0].history_charge.length === 5) {
        machine.battery[0].history_charge.pop();
      }
      machine.battery[0].history_charge.push(battery.charge);

      if (machine.battery[0].time_labels_history_charge.length === 5) {
        machine.battery[0].time_labels_history_charge.pop();
      }
      machine.battery[0].time_labels_history_charge.push(new Date());
    } else {
      machine = new this.MachineInfoModel(createMachineDto);

      machine.cpu = {
        ...machine.cpu,
        history_cpu_percentage: [cpu.cpu_percentage],
        time_labels_cpu_percentage: [new Date()],
        history_cpu_temperature: [cpu.cpu_mean_temperature],
        time_labels_cpu_temperature: [new Date()],
      };

      machine.memory_ram = {
        ...machine.memory_ram,
        history_percent: [memory_ram.percent],
        time_labels_history_percent: [new Date()],
      };
      machine.swap_memory = {
        ...machine.swap_memory,
        history_percent: [swap_memory.percent],
        time_labels_history_percent: [new Date()],
      };
      machine.disk = {
        ...machine.disk,
        history_percent: [disk.percent],
        time_labels_history_percent: [new Date()],
      };
      machine.network = {
        ...machine.network,
        history_packets_sent: [network.packets_sent],
        time_labels_history_packets_sent: [new Date()],
        history_packets_received: [network.packets_received],
        time_labels_history_packets_received: [new Date()],
      };
      machine.battery = {
        ...machine.battery,
        history_charge: [battery.charge],
        time_labels_history_charge: [new Date()],
      };
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

    machine.user_id = userId;
    return machine.save();
  }

  async findAll() {
    return this.MachineInfoModel.find();
  }

  async getMachineInfo(machine_id: String) {
    const machineInfo = await this.MachineInfoModel.findById(machine_id);

    if (!machineInfo) {
      throw new Error('Machine not founded');
    }

    return machineInfo;
  }

  async findOne(id: string) {
    return this.MachineInfoModel.findById(id);
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
