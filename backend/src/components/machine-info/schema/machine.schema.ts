// eslint-disable-next-line max-classes-per-file
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiExtraModels } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { Document, SchemaTypes } from 'mongoose';

@Schema()
export class UserInfo {
  @Prop({ type: SchemaTypes.String })
    username: string;

  @Prop({ type: SchemaTypes.Number })
    uuid: number;

  @Prop({ type: SchemaTypes.String })
    os_name: string;

  @Prop({ type: SchemaTypes.String })
    os_release: string;

  @Prop({ type: SchemaTypes.String })
    os_architecture: string;

  @Prop({ type: SchemaTypes.String })
    os_version: string;
}

interface Fans {
  size_fans: number;
  array_fans: string[];
}

interface Cpu {
  cpu_count: number;
  cpu_mean_percentage: number;
  history_cpu_percentage: number[];
  time_labels_cpu_percentage: string[];
  temperature_unit: string;
  cpu_mean_temperature: number;
  history_cpu_temperature: number[];
  time_labels_cpu_temperature: string[];
}

interface MemoryRAM {
  total: string;
  available: string;
  percent: number;
  used: string;
  free: string;
  history_percent: number[];
  time_labels_history_percent: string[];
}

interface SwapMemory {
  total: string;
  used: string;
  free: string;
  percent: number;
  history_percent: number[];
  time_labels_history_percent: string[];
}

interface Disk {
  free: string;
  percent: number;
  total: string;
  used: string;
  history_percent: number[];
  time_labels_history_percent: string[];
}

interface Network {
  bytes_sent: string;
  bytes_received: string;
  history_packets_sent: number[];
  time_labels_history_packets_sent: string[];
  history_packets_received: number[];
  time_labels_history_packets_received: string[];
  error_in: number;
  error_out: number;
  drop_in: number;
  drop_out: number;
}

export interface Battery {
  charge: number;
  history_charge: number[];
  time_labels_history_charge: string[];
  time_left: string;
  power_plugged: string;
}

export class MachineData {
  fans: Fans;

  cpu: Cpu;

  memory_ram: MemoryRAM;

  swap_memory: SwapMemory;

  disk: Disk;

  network: Network;

  battery: Battery;

  created_at: Date;
}

@Schema()
export class MachineInfo {
  @Prop({ type: SchemaTypes.String })
    user_id: string;

  @Prop({ type: () => UserInfo, required: true })
    user_info: UserInfo;

  @Prop({ type: [{ type: SchemaTypes.Mixed }] })
    data: MachineData[];
}

export type MachineInfoDocument = MachineInfo & Document;
export const MachineInfoSchema = SchemaFactory.createForClass(MachineInfo);
