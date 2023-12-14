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
import { FormDataRequest } from 'nestjs-form-data';
import { EXCEPTION_MSGS } from '../common/consts/index';
import { AtPublic, RtPublic } from '../common/decorators/index';
import { CreateSoilBodyDto, EditSoilBodyDto } from '../common/dtos/index';
import { AtGuard, RtGuard } from '../common/guards/index';
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
      throw new NotFoundException(EXCEPTION_MSGS.SOIL_NOT_FOUND);
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
  @FormDataRequest()
  @HttpCode(HttpStatus.CREATED)
  async createSoil(@Body() createSoilBodyDto: CreateSoilBodyDto) {
    return await this.soilService.createSoil(createSoilBodyDto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async deleteById(@Param('id') id: string) {
    return await this.soilService.deleteById(+id);
  }

  @Patch('edit/:id')
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  async editById(
    @Param('id') id: string,
    @Body() editSoilBodyDto: EditSoilBodyDto,
  ) {
    return await this.soilService.editById(+id, editSoilBodyDto);
  }
}
