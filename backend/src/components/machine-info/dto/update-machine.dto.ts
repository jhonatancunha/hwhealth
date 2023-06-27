import { PartialType } from '@nestjs/swagger';
import CreateMachineDto from './create-machine.dto';

export default class UpdateMachineDto extends PartialType(CreateMachineDto) {}
