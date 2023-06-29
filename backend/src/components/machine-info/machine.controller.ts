import {
  Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request,
} from '@nestjs/common';
import JwtAuthGuard from '@guards/jwtAuth.guard';
import {
  ApiBearerAuth, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import MachineService from './machine.service';
import CreateMachineDto from './dto/create-machine.dto';
import UpdateMachineDto from './dto/update-machine.dto';
import { MachineInfo } from './schema/machine.schema';

@Controller('machine')
@ApiBearerAuth()
@ApiTags('Machine')
export default class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @ApiOkResponse({
    type: MachineInfo,
    description: '200. Returns the created machine',
  })
  @ApiUnauthorizedResponse({
    description: '401. UnauthorizedException.',
  })
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Request() req, @Body() createMachineDto: CreateMachineDto): Promise<MachineInfo> {
    const token = req.headers.authorization.replace('Bearer ', '');
    const { id } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf-8'));

    return this.machineService.create(id, createMachineDto);
  }

  @ApiOkResponse({
    type: MachineInfo,
    description: '200. Returns all machines',
  })
  @ApiUnauthorizedResponse({
    description: '401. UnauthorizedException.',
  })
  @ApiInternalServerErrorResponse({
    description: '500. Internal Server Error.',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    const token = req.headers.authorization.replace('Bearer ', '');
    const { id } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf-8'));

    return this.machineService.findAll(id);
  }

  @ApiOkResponse({
    type: MachineInfo,
    description: '200. Returns all machines',
  })
  @ApiUnauthorizedResponse({
    description: '401. UnauthorizedException.',
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getMachineInfo(@Param('id') id: string): Promise<MachineInfo> {
    return this.machineService.getMachineInfo(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMachineDto: UpdateMachineDto) {
    return this.machineService.update(id, updateMachineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.machineService.remove(id);
  }
}
