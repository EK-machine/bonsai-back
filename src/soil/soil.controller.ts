import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AtPublic, RtPublic } from '../common/decorators/index.js';
import { AtGuard, RtGuard } from '../common/guards/index.js';
import { SOIL_NOT_FOUND } from './consts/soil.constants.js';
import { CreateSoilDto, EditSoilDto } from './dto/index.js';
import { SoilService } from './soil.service.js';

@Controller('related/soil')
@UseGuards(RtGuard, AtGuard)
export class SoilController {
  constructor(private readonly soilService: SoilService) {}

  @AtPublic()
  @RtPublic()
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllSoils() {
    const allSoils = await this.soilService.getAllSoils();
    if (!allSoils) {
      throw new NotFoundException(SOIL_NOT_FOUND);
    }
    return allSoils;
  }

  @AtPublic()
  @RtPublic()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getSoilById(@Param('id') id: string) {
    return this.soilService.getSoilById(+id);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createSoil(@Body() createSoil: CreateSoilDto) {
    return await this.soilService.createSoil(createSoil);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async deleteById(@Param('id') id: string) {
    return await this.soilService.deleteById(+id);
  }

  @Patch('edit/:id')
  @HttpCode(HttpStatus.OK)
  async editById(@Param('id') id: string, @Body() editSoilDto: EditSoilDto) {
    return await this.soilService.editById(+id, editSoilDto);
  }
}
