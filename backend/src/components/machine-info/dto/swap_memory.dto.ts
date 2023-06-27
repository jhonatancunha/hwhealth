import { ApiProperty } from '@nestjs/swagger';

export default class SwapMemoryDto {
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

  @ApiProperty({ type: [String] })
    time_labels_history_percent: string[];
}
