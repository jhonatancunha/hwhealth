/* eslint-disable camelcase */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import LimiarService from '@components/limiar/limiar.service';
import { InjectRedis, RedisService } from '@liaoliaots/nestjs-redis';
import { Redis, RedisKey } from 'ioredis';
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
    @InjectRedis() private readonly redisClient: Redis,
  ) {}

  async create(userId: string, createMachineDto: CreateMachineDto): Promise<MachineInfo> {
    const {
      user_info, cpu, memory_ram, swap_memory, disk, network, battery,
    } = createMachineDto;

    const MAX_HISTORY = 5;

    let machine = await this.MachineInfoModel.findOne({
      'user_info.uuid': user_info.uuid,
    });

    if (!machine) {
      const newCreateMachineDto = {
        ...createMachineDto,
        cpu: {
          ...createMachineDto.cpu,
          history_cpu_percentage: [],
          time_labels_cpu_percentage: [],
          history_cpu_temperature: [],
          time_labels_cpu_temperature: [],
        },
        memory_ram: {
          ...createMachineDto.memory_ram,
          history_percent: [],
          time_labels_history_percent: [],
        },
        swap_memory: {
          ...createMachineDto.swap_memory,
          history_percent: [],
          time_labels_history_percent: [],
        },
        disk: {
          ...createMachineDto.disk,
          history_percent: [],
          time_labels_history_percent: [],
        },
        network: {
          ...createMachineDto.network,
          history_packets_sent: [],
          time_labels_history_packets_sent: [],
          history_packets_received: [],
          time_labels_history_packets_received: [],
        },
        battery: {
          ...createMachineDto.battery,
          history_charge: [],
          time_labels_history_charge: [],
        },
      };

      machine = await this.MachineInfoModel.create(newCreateMachineDto);

      const createdLimiar = await this.limiarService.create({
        machine_id: new Types.ObjectId(machine._id).toString(),
        battery_percentage: 15,
        cpu_temperature: 90,
        disk_storage: 95,
        ram_memory_use: 95,
        swap_memory_use: 95,
      });

      createdLimiar.save();
    }

    const TODAY = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    machine.user_info = {
      ...machine.user_info,
      last_update: new Date(),
    };

    machine.cpu = {
      ...machine.cpu,
      history_cpu_percentage: [...machine.cpu.history_cpu_percentage, cpu.cpu_mean_percentage],
      time_labels_cpu_percentage: [...machine.cpu.time_labels_cpu_percentage, TODAY],
      history_cpu_temperature: [...machine.cpu.history_cpu_temperature, cpu.cpu_mean_temperature],
      time_labels_cpu_temperature: [...machine.cpu.time_labels_cpu_temperature, TODAY],
    };

    if (machine.cpu.history_cpu_percentage.length > MAX_HISTORY) {
      machine.cpu.history_cpu_percentage.shift();
      machine.cpu.time_labels_cpu_percentage.shift();
      machine.cpu.history_cpu_temperature.shift();
      machine.cpu.time_labels_cpu_temperature.shift();
    }

    machine.memory_ram = {
      ...machine.memory_ram,
      history_percent: [...machine.memory_ram.history_percent, memory_ram.percent],
      time_labels_history_percent: [...machine.memory_ram.time_labels_history_percent, TODAY],
    };

    if (machine.memory_ram.history_percent.length > MAX_HISTORY) {
      machine.memory_ram.history_percent.shift();
      machine.memory_ram.time_labels_history_percent.shift();
    }

    machine.swap_memory = {
      ...machine.swap_memory,
      history_percent: [...machine.swap_memory.history_percent, swap_memory.percent],
      time_labels_history_percent: [...machine.swap_memory.time_labels_history_percent, TODAY],
    };

    if (machine.swap_memory.history_percent.length > MAX_HISTORY) {
      machine.swap_memory.history_percent.shift();
      machine.swap_memory.time_labels_history_percent.shift();
    }

    machine.disk = {
      ...machine.disk,
      history_percent: [...machine.disk.history_percent, disk.percent],
      time_labels_history_percent: [...machine.disk.time_labels_history_percent, TODAY],
    };

    if (machine.disk.history_percent.length > MAX_HISTORY) {
      machine.disk.history_percent.shift();
      machine.disk.time_labels_history_percent.shift();
    }

    machine.network = {
      ...machine.network,
      history_packets_sent: [...machine.network.history_packets_sent, network.packets_sent],
      time_labels_history_packets_sent: [...machine.network.time_labels_history_packets_sent, TODAY],
      history_packets_received: [...machine.network.history_packets_received, network.packets_received],
      time_labels_history_packets_received: [...machine.network.time_labels_history_packets_received, TODAY],
    };

    if (machine.network.history_packets_sent.length > MAX_HISTORY) {
      machine.network.history_packets_sent.shift();
      machine.network.time_labels_history_packets_sent.shift();
      machine.network.history_packets_received.shift();
      machine.network.time_labels_history_packets_received.shift();
    }

    machine.battery = {
      ...machine.battery,
      history_charge: [...machine.battery.history_charge, battery.charge],
      time_labels_history_charge: [...machine.battery.time_labels_history_charge, TODAY],
    };

    if (machine.battery.history_charge.length > MAX_HISTORY) {
      machine.battery.history_charge.shift();
      machine.battery.time_labels_history_charge.shift();
    }

    machine.user_id = userId;

    await this.redisClient.del(machine._id.toString() as RedisKey);
    return machine.save();
  }

  async findAll() {
    return this.MachineInfoModel.find();
  }

  async getMachineInfo(machine_id: String) {
    const cachedData = await this.redisClient.get(machine_id as RedisKey);

    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      return parsedData;
    }

    const machineInfo = await this.MachineInfoModel.findById(machine_id);

    if (!machineInfo) {
      throw new Error('Machine not founded');
    }

    await this.redisClient.set(machine_id as RedisKey, JSON.stringify(machineInfo));

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
