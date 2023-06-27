import { ApiProperty } from '@nestjs/swagger';

export default class FansDto {
  @ApiProperty({ type: Number })
    size_fans: number;

  @ApiProperty({ type: [String] })
    array_fans: string[];
}
