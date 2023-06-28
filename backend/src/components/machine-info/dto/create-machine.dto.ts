/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger';

class UserInfoDto {
  @ApiProperty({ type: String })
    username: string;

  @ApiProperty({ type: Number })
    uuid: number;

  @ApiProperty({ type: String })
    os_name: string;

  @ApiProperty({ type: String })
    os_release: string;

  @ApiProperty({ type: String })
    os_architecture: string;

  @ApiProperty({ type: String })
    os_version: string;

  @ApiProperty({ type: Date })
    last_update: Date;
}

class FansDto {
  @ApiProperty({ type: Number })
    size_fans: number;

  @ApiProperty({ type: [String] })
    array_fans: string[];
}

class CpuDto {
  @ApiProperty({ type: Number })
    cpu_count: number;

  @ApiProperty({ type: Number })
    cpu_mean_percentage: number;

  @ApiProperty({ type: [Number] })
    cpu_percentage: number[];

  @ApiProperty({ type: [Number] })
    history_cpu_percentage: number[];

  @ApiProperty({ type: [Date] })
    time_labels_cpu_percentage: Date[];

  @ApiProperty({ type: String })
    temperature_unit: string;

  @ApiProperty({ type: Number })
    cpu_mean_temperature: number;

  @ApiProperty({ type: [Number] })
    history_cpu_temperature: number[];

  @ApiProperty({ type: [Date] })
    time_labels_cpu_temperature: Date[];
}

class MemoryRamDto {
  @ApiProperty({ type: String })
    total: string;

  @ApiProperty({ type: String })
    available: string;

  @ApiProperty({ type: Number })
    percent: number;

  @ApiProperty({ type: String })
    used: string;

  @ApiProperty({ type: String })
    free: string;

  @ApiProperty({ type: [Number] })
    history_percent: number[];

  @ApiProperty({ type: [Date] })
    time_labels_history_percent: Date[];
}

class SwapMemoryDto {
  @ApiProperty({ type: String })
    total: string;

  @ApiProperty({ type: String })
    used: string;

  @ApiProperty({ type: String })
    free: string;

  @ApiProperty({ type: Number })
    percent: number;

  @ApiProperty({ type: [Number] })
    history_percent: number[];

  @ApiProperty({ type: [Date] })
    time_labels_history_percent: Date[];
}

class DiskDto {
  @ApiProperty({ type: String })
    free: string;

  @ApiProperty({ type: Number })
    percent: number;

  @ApiProperty({ type: String })
    total: string;

  @ApiProperty({ type: String })
    used: string;

  @ApiProperty({ type: [Number] })
    history_percent: number[];

  @ApiProperty({ type: [Date] })
    time_labels_history_percent: Date[];
}

class NetworkDto {
  @ApiProperty({ type: String })
    bytes_sent: string;

  @ApiProperty({ type: String })
    bytes_received: string;

  @ApiProperty({ type: Number })
    packets_sent: number;

  @ApiProperty({ type: Number })
    packets_received: number;

  @ApiProperty({ type: [Number] })
    history_packets_sent: number[];

  @ApiProperty({ type: [Date] })
    time_labels_history_packets_sent: Date[];

  @ApiProperty({ type: [Number] })
    history_packets_received: number[];

  @ApiProperty({ type: [Date] })
    time_labels_history_packets_received: Date[];

  @ApiProperty({ type: Number })
    error_in: number;

  @ApiProperty({ type: Number })
    error_out: number;

  @ApiProperty({ type: Number })
    drop_in: number;

  @ApiProperty({ type: Number })
    drop_out: number;
}

class BatteryDto {
  @ApiProperty({ type: Number })
    charge: number;

  @ApiProperty({ type: [Number] })
    history_charge: number[];

  @ApiProperty({ type: [Date] })
    time_labels_history_charge: Date[];

  @ApiProperty({ type: String })
    time_left: string;

  @ApiProperty({ type: Boolean })
    power_plugged: boolean;
}

export default class MachineInfoDto {
  @ApiProperty({ type: String })
    name: string;

  @ApiProperty({ type: Number })
    uuid: number;

  @ApiProperty({ type: UserInfoDto })
    user_info: UserInfoDto;

  @ApiProperty({ type: FansDto })
    fans: FansDto;

  @ApiProperty({ type: CpuDto })
    cpu: CpuDto;

  @ApiProperty({ type: MemoryRamDto })
    memory_ram: MemoryRamDto;

  @ApiProperty({ type: SwapMemoryDto })
    swap_memory: SwapMemoryDto;

  @ApiProperty({ type: DiskDto })
    disk: DiskDto;

  @ApiProperty({ type: NetworkDto })
    network: NetworkDto;

  @ApiProperty({ type: BatteryDto })
    battery: BatteryDto;
}
