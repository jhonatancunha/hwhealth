import {
  Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import JwtAuthGuard from '@guards/jwtAuth.guard';
import mongoose from 'mongoose';
import LimiarService from './limiar.service';
import CreateLimiarDto from './dto/create-limiar.dto';
import UpdateLimiarDto from './dto/update-limiar.dto';
import Limiar from './schema/limiar.schema';

@Controller('limiar')
@ApiBearerAuth()
@ApiTags('Limiar')
export default class LimiarController {
  constructor(private readonly limiarService: LimiarService) {}

  @ApiOkResponse({ type: Limiar, description: '200. Returns the created limiar' })
  @ApiUnauthorizedResponse({ description: '401. UnauthorizedException' })
  @ApiInternalServerErrorResponse({ description: '500. Internal Server Error' })
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createLimiarDto: CreateLimiarDto): Promise<Limiar> {
    return this.limiarService.create(createLimiarDto);
  }

  @ApiOkResponse({
    type: Limiar,
    description: '200. Returns the limiar founded by id',
  })
  @ApiUnauthorizedResponse({
    description: '401. UnauthorizedException.',
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.limiarService.findOne(id);
  }

  @ApiOkResponse({ type: Limiar, description: '200. Returns the updated limiar' })
  @ApiBadRequestResponse({ description: '403. Limiar not founded' })
  @ApiUnauthorizedResponse({ description: '401. UnauthorizedException' })
  @ApiInternalServerErrorResponse({ description: '500. Internal Server Error' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLimiarDto: UpdateLimiarDto) {
    return this.limiarService.update(id, updateLimiarDto);
  }
}
