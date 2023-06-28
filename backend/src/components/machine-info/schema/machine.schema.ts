// eslint-disable-next-line max-classes-per-file
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

interface UserInfo {
  username: string;
  uuid: number;
  os_name: string;
  os_release: string;
  os_architecture: string;
  os_version: string;
}

interface Fans {
  size_fans: number;
  array_fans: string[];
}

interface Cpu {
  cpu_count: number;
  cpu_mean_percentage: number;
  history_cpu_percentage: number[][];
  time_labels_cpu_percentage: Date[];
  temperature_unit: string;
  cpu_mean_temperature: number;
  history_cpu_temperature: number[];
  time_labels_cpu_temperature: Date[];
}

interface MemoryRAM {
  total: string;
  available: string;
  percent: number;
  used: string;
  free: string;
  history_percent: number[];
  time_labels_history_percent: Date[];
}

interface SwapMemory {
  total: string;
  used: string;
  free: string;
  percent: number;
  history_percent: number[];
  time_labels_history_percent: Date[];
}

interface Disk {
  free: string;
  percent: number;
  total: string;
  used: string;
  history_percent: number[];
  time_labels_history_percent: Date[];
}

interface Network {
  bytes_sent: string;
  bytes_received: string;
  history_packets_sent: number[];
  time_labels_history_packets_sent: Date[];
  history_packets_received: number[];
  time_labels_history_packets_received: Date[];
  error_in: number;
  error_out: number;
  drop_in: number;
  drop_out: number;
}

export interface Battery {
  charge: number;
  history_charge: number[];
  time_labels_history_charge: Date[];
  time_left: string;
  power_plugged: string;
}

@Schema()
export class MachineInfo {
  @Prop({ type: SchemaTypes.String })
    user_id: string;

  @Prop({ type: [{ type: SchemaTypes.Mixed }], required: true })
    user_info: UserInfo;

  @Prop({ type: [{ type: SchemaTypes.Mixed }], required: true })
    fans: Fans;

  @Prop({ type: [{ type: SchemaTypes.Mixed }], required: true })
    cpu: Cpu;

  @Prop({ type: [{ type: SchemaTypes.Mixed }], required: true })
    memory_ram: MemoryRAM;

  @Prop({ type: [{ type: SchemaTypes.Mixed }], required: true })
    swap_memory: SwapMemory;

  @Prop({ type: [{ type: SchemaTypes.Mixed }], required: true })
    disk: Disk;

  @Prop({ type: [{ type: SchemaTypes.Mixed }], required: true })
    network: Network;

  @Prop({ type: [{ type: SchemaTypes.Mixed }], required: true })
    battery: Battery;
}

export type MachineInfoDocument = MachineInfo & Document;
export const MachineInfoSchema = SchemaFactory.createForClass(MachineInfo);
