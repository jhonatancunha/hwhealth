import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, SchemaTypes } from 'mongoose';

@Schema()
export class Notification {
  @ApiProperty({ type: String })
  @Prop({ type: SchemaTypes.String })
    user_id: string;

  @ApiProperty({ type: String })
  @Prop({ type: SchemaTypes.String })
    machine_id: string;

  @ApiProperty({ type: String })
  @Prop({ type: SchemaTypes.String })
    title: string;

  @ApiProperty({ type: String })
  @Prop({ type: SchemaTypes.String })
    message: string;

  @ApiProperty({ type: Date })
  @Prop({ type: SchemaTypes.Date })
    created_at: Date;
}

export type NotificationDocument = Notification & Document;
export const NotificationSchema = SchemaFactory.createForClass(Notification);
