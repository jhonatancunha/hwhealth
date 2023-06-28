import { ApiProperty } from '@nestjs/swagger';

export default class UpdateLimiarDto {
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
