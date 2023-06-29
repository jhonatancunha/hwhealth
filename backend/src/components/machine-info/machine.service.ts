/* eslint-disable camelcase */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import LimiarService from '@components/limiar/limiar.service';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis, RedisKey } from 'ioredis';
import { OneSignalService } from 'onesignal-api-client-nest';
import UsersService from '@components/users/users.service';
import NotificationService from '@components/notification/notification.service';
import { MachineInfo } from './schema/machine.schema';
import CreateMachineDto from './dto/create-machine.dto';
import UpdateMachineDto from './dto/update-machine.dto';

@Injectable()
export default class MachineService {
  constructor(
    @InjectModel(MachineInfo.name)
    private MachineInfoModel: Model<MachineInfo>,
    private readonly userService: UsersService,
    private readonly limiarService: LimiarService,
    private readonly oneSignalService: OneSignalService,
    private readonly notificationService: NotificationService,
    @InjectRedis() private readonly redisClient: Redis,
  ) {}

  async notify(title: string, message: string, user_one_signal_id: string) {
    const notification = {
      contents: {
        pt: message,
        en: message,
      },
      headings: {
        pt: title,
        en: title,
      },
      include_player_ids: [user_one_signal_id],
    };

    await this.oneSignalService.createNotification(
      notification,
    );
  }

  async verifyIfLimiarIsExceeded(machineInfo) {
    const foundedLimiar = await this.limiarService.findOne(machineInfo._id);
    const foundedUser = await this.userService.getById(machineInfo.user_id);

    let title: string;
    let message: string;

    if (machineInfo.cpu.cpu_mean_temperature >= foundedLimiar.cpu_temperature) {
      title = 'Atenção com a CPU';
      message = `A temperatura média do CPU excedeu o limiar definido, chegando a ${machineInfo.cpu.cpu_mean_temperature} graus celsius`;
      await this.notify(
        title,
        message,
        foundedUser.user_one_signal_id,
      );

      await this.notificationService.create({
        user_id: machineInfo.user_id, machine_id: machineInfo._id, title, message,
      });
    }

    if (machineInfo.memory_ram.percent >= foundedLimiar.ram_memory_use) {
      title = 'Atenção com a Memória RAM';
      message = `Memória RAM excedeu o limiar de uso, chegando a ${machineInfo.memory_ram.percent}%`;
      await this.notify(
        title,
        message,
        foundedUser.user_one_signal_id,
      );

      await this.notificationService.create({
        user_id: machineInfo.user_id, machine_id: machineInfo._id, title, message,
      });
    }

    if (machineInfo.swap_memory.percent >= foundedLimiar.swap_memory_use) {
      title = 'Atenção com a Memória SWAP';
      message = `Memória SWAP excedeu o limiar de uso, chegando a ${machineInfo.swap_memory.percent}%`;
      await this.notify(
        title,
        message,
        foundedUser.user_one_signal_id,
      );

      await this.notificationService.create({
        user_id: machineInfo.user_id, machine_id: machineInfo._id, title, message,
      });
    }

    if (machineInfo.disk.percent >= foundedLimiar.disk_storage) {
      title = 'Atenção com o Disco Rígido';
      message = `O espaço usado no disco excedeu o limiar, chegando a ${machineInfo.disk.percent}%`;
      await this.notify(
        title,
        message,
        foundedUser.user_one_signal_id,
      );

      await this.notificationService.create({
        user_id: machineInfo.user_id, machine_id: machineInfo._id, title, message,
      });
    }

    if (machineInfo.battery.charge <= foundedLimiar.battery_percentage) {
      title = 'Atenção com a Bateria';
      message = `Bateria está com menos de ${foundedLimiar.battery_percentage}% de carga restante`;

      await this.notify(
        title,
        message,
        foundedUser.user_one_signal_id,
      );

      await this.notificationService.create({
        user_id: machineInfo.user_id, machine_id: machineInfo._id, title, message,
      });
    }
  }

  async create(
    userId: string,
    createMachineDto: CreateMachineDto,
  ): Promise<MachineInfo> {
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
      history_cpu_percentage: [
        ...machine.cpu.history_cpu_percentage,
        cpu.cpu_mean_percentage,
      ],
      time_labels_cpu_percentage: [
        ...machine.cpu.time_labels_cpu_percentage,
        TODAY,
      ],
      history_cpu_temperature: [
        ...machine.cpu.history_cpu_temperature,
        cpu.cpu_mean_temperature,
      ],
      time_labels_cpu_temperature: [
        ...machine.cpu.time_labels_cpu_temperature,
        TODAY,
      ],
    };

    if (machine.cpu.history_cpu_percentage.length > MAX_HISTORY) {
      machine.cpu.history_cpu_percentage.shift();
      machine.cpu.time_labels_cpu_percentage.shift();
      machine.cpu.history_cpu_temperature.shift();
      machine.cpu.time_labels_cpu_temperature.shift();
    }

    machine.memory_ram = {
      ...machine.memory_ram,
      history_percent: [
        ...machine.memory_ram.history_percent,
        memory_ram.percent,
      ],
      time_labels_history_percent: [
        ...machine.memory_ram.time_labels_history_percent,
        TODAY,
      ],
    };

    if (machine.memory_ram.history_percent.length > MAX_HISTORY) {
      machine.memory_ram.history_percent.shift();
      machine.memory_ram.time_labels_history_percent.shift();
    }

    machine.swap_memory = {
      ...machine.swap_memory,
      history_percent: [
        ...machine.swap_memory.history_percent,
        swap_memory.percent,
      ],
      time_labels_history_percent: [
        ...machine.swap_memory.time_labels_history_percent,
        TODAY,
      ],
    };

    if (machine.swap_memory.history_percent.length > MAX_HISTORY) {
      machine.swap_memory.history_percent.shift();
      machine.swap_memory.time_labels_history_percent.shift();
    }

    machine.disk = {
      ...machine.disk,
      history_percent: [...machine.disk.history_percent, disk.percent],
      time_labels_history_percent: [
        ...machine.disk.time_labels_history_percent,
        TODAY,
      ],
    };

    if (machine.disk.history_percent.length > MAX_HISTORY) {
      machine.disk.history_percent.shift();
      machine.disk.time_labels_history_percent.shift();
    }

    machine.network = {
      ...machine.network,
      history_packets_sent: [
        ...machine.network.history_packets_sent,
        network.packets_sent,
      ],
      time_labels_history_packets_sent: [
        ...machine.network.time_labels_history_packets_sent,
        TODAY,
      ],
      history_packets_received: [
        ...machine.network.history_packets_received,
        network.packets_received,
      ],
      time_labels_history_packets_received: [
        ...machine.network.time_labels_history_packets_received,
        TODAY,
      ],
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
      time_labels_history_charge: [
        ...machine.battery.time_labels_history_charge,
        TODAY,
      ],
    };

    if (machine.battery.history_charge.length > MAX_HISTORY) {
      machine.battery.history_charge.shift();
      machine.battery.time_labels_history_charge.shift();
    }

    machine.user_id = userId;

    await this.verifyIfLimiarIsExceeded(machine);

    await this.redisClient.del(machine._id.toString() as RedisKey);
    return machine.save();
  }

  async findAll(userId: string) {
    return this.MachineInfoModel.find({ user_id: userId });
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

    await this.redisClient.set(
      machine_id as RedisKey,
      JSON.stringify(machineInfo),
    );

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
