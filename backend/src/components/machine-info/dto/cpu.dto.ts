import { ApiProperty } from '@nestjs/swagger';

export default class CpuDto {
  @ApiProperty({ type: Number })
    cpu_count: number;

  @ApiProperty({ type: Number })
    cpu_mean_percentage: number;

  @ApiProperty({ type: [Number] })
    history_cpu_percentage: number[];

  @ApiProperty({ type: [String] })
    time_labels_cpu_percentage: string[];

  @ApiProperty({ type: String })
    temperature_unit: string;

  @ApiProperty({ type: Number })
    cpu_mean_temperature: number;

  @ApiProperty({ type: [Number] })
    history_cpu_temperature: number[];

  @ApiProperty({ type: [String] })
    time_labels_cpu_temperature: string[];
}
