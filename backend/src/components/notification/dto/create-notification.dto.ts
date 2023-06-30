import { ApiProperty } from '@nestjs/swagger';

export default class CreateNotificationDto {
  @ApiProperty({ type: String })
    user_id: string;

  @ApiProperty({ type: String })
    machine_id: string;

  @ApiProperty({ type: String })
    title: string;

  @ApiProperty({ type: String })
    message: string;

  @ApiProperty({ type: Date })
    created_at: Date;
}
