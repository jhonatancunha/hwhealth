import { PartialType } from '@nestjs/swagger';
import CreateLimiarDto from './create-limiar.dto';

export default class UpdateLimiarDto extends PartialType(CreateLimiarDto) {}
