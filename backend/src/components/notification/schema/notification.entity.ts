import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema()
export class Notification {
  @Prop({ type: SchemaTypes.String })
    user_id: string;

  @Prop({ type: SchemaTypes.String })
    machine_id: string;

  @Prop({ type: SchemaTypes.String })
    title: string;

  @Prop({ type: SchemaTypes.String })
    message: string;
}

export type NotificationDocument = Notification & Document;
export const NotificationSchema = SchemaFactory.createForClass(Notification);
