import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export default class CreateLimiarDto {
  @ApiProperty()
    machine_id: string;

  @ApiProperty()
    cpu_temperature: number;

  @ApiProperty()
    ram_memory_use: number;

  @ApiProperty()
    swap_memory_use: number;

  @ApiProperty()
    disk_storage: number;

  @ApiProperty()
    battery_percentage: number;
}
