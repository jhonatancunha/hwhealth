import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { HydratedDocument } from 'mongoose';

@Schema()
export default class Limiar {
  @ApiProperty({ type: String })
    _id: ObjectId;

  @ApiProperty({ type: String })
  @Prop({ required: true })
    machine_id: string;

  @ApiProperty({ type: Number })
  @Prop({ required: true })
    cpu_temperature: number;

  @ApiProperty({ type: Number })
  @Prop({ required: Number })
    ram_memory_use: number;

  @ApiProperty({ type: Number })
  @Prop({ required: Number })
    swap_memory_use: number;

  @ApiProperty({ type: Number })
  @Prop({ required: Number })
    disk_storage: number;

  @ApiProperty({ type: Number })
  @Prop({ required: Number })
    battery_percentage: number;
}

export type LimiarDocument = HydratedDocument<Limiar>;
export const LimiarSchema = SchemaFactory.createForClass(Limiar);
