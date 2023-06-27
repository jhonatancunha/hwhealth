import { ApiProperty } from '@nestjs/swagger';

export default class CreateLimiarDto {
  @ApiProperty()
    machine_id: string;

  @ApiProperty()
    cpu_temperature: number;

  @ApiProperty()
    ram_memory_use: number;

  @ApiProperty()
    disk_storage: number;

  @ApiProperty()
    battery_percentage: number;
}
