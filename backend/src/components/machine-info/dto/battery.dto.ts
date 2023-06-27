import { ApiProperty } from '@nestjs/swagger';

export default class BatteryDto {
  @ApiProperty({ type: Number })
    charge: number;

  @ApiProperty({ type: [Number] })
    history_charge: number[];

  @ApiProperty({ type: [String] })
    time_labels_history_charge: string[];

  @ApiProperty({ type: String })
    time_left: string;

  @ApiProperty({ type: String })
    power_plugged: string;
}
