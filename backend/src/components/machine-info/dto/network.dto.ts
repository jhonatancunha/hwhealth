import { ApiProperty } from '@nestjs/swagger';

export default class NetworkDto {
  @ApiProperty({ type: String })
    bytes_sent: string;

  @ApiProperty({ type: String })
    bytes_received: string;

  @ApiProperty({ type: [Number] })
    history_packets_sent: number[];

  @ApiProperty({ type: [String] })
    time_labels_history_packets_sent: string[];

  @ApiProperty({ type: [Number] })
    history_packets_received: number[];

  @ApiProperty({ type: [String] })
    time_labels_history_packets_received: string[];

  @ApiProperty({ type: Number })
    error_in: number;

  @ApiProperty({ type: Number })
    error_out: number;

  @ApiProperty({ type: Number })
    drop_in: number;

  @ApiProperty({ type: Number })
    drop_out: number;
}
