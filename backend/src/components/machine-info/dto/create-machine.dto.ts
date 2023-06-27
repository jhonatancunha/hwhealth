import { ApiProperty } from '@nestjs/swagger';

export default class MachineDataDto {
  @ApiProperty({ type: String })
    username: string;

  @ApiProperty({ type: String })
    user_uuid: string;

  @ApiProperty({ type: String })
    os_name: string;

  @ApiProperty({ type: String })
    os_release: string;

  @ApiProperty({ type: String })
    os_architecture: string;

  @ApiProperty({ type: String })
    os_version: string;

  @ApiProperty({ type: Number })
    cpu_count: number;

  @ApiProperty({ type: [Number] })
    cpu_percentage: number[];

  @ApiProperty({ type: String })
    temperature_unit: string;

  @ApiProperty({ type: Number })
    cpu_mean_temperature:number;

  @ApiProperty({ type: [Number] })
    cpu_temperature: number[];

  @ApiProperty({ type: String })
    total_ram: string;

  @ApiProperty({ type: String })
    available_ram: string;

  @ApiProperty({ type: Number })
    ram_percent: number;

  @ApiProperty({ type: String })
    used_ram: string;

  @ApiProperty({ type: String })
    free_ram: string;

  @ApiProperty({ type: String })
    total_swap: string;

  @ApiProperty({ type: String })
    used_swap: string;

  @ApiProperty({ type: String })
    free_swap: string;

  @ApiProperty({ type: Number })
    swap_percent: number;

  @ApiProperty({ type: String })
    total_disk: string;

  @ApiProperty({ type: String })
    used_disk: string;

  @ApiProperty({ type: String })
    free_disk: string;

  @ApiProperty({ type: Number })
    disk_percent: number;

  @ApiProperty({ type: Number })
    bytes_sent: number;

  @ApiProperty({ type: Number })
    bytes_received: number;

  @ApiProperty({ type: Number })
    packets_sent: number;

  @ApiProperty({ type: Number })
    packets_received: number;

  @ApiProperty({ type: Number })
    error_in: number;

  @ApiProperty({ type: Number })
    error_out: number;

  @ApiProperty({ type: Number })
    drop_in: number;

  @ApiProperty({ type: Number })
    drop_out: number;

  @ApiProperty({ type: Number })
    battery_charge: number;

  @ApiProperty({ type: String })
    battery_time_left: string;

  @ApiProperty({ type: Boolean })
    battery_power_plugged: boolean;
}
