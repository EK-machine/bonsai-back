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
import {
  CreateInstrumentBodyDto,
  EditInstrumentBodyDto,
} from '../common/dtos/index';
import { AtGuard, RtGuard } from '../common/guards/index';
import { InstrumentService } from './instrument.service.js';

@Controller('related/instrument')
@UseGuards(RtGuard, AtGuard)
export class InstrumentController {
  constructor(private readonly instrumentService: InstrumentService) {}

  @AtPublic()
  @RtPublic()
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllInstruments() {
    const allInstruments = await this.instrumentService.getAllInstruments();
    if (!allInstruments) {
      throw new NotFoundException(EXCEPTION_MSGS.INSTRUMENT_NOT_FOUND);
    }
    return allInstruments;
  }

  @AtPublic()
  @RtPublic()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getInstrumentById(@Param('id') id: string) {
    return this.instrumentService.getInstrumentById(+id);
  }

  @Post('create')
  @FormDataRequest()
  @HttpCode(HttpStatus.CREATED)
  async createInstrument(
    @Body() createInstrumentBodyDto: CreateInstrumentBodyDto,
  ) {
    return await this.instrumentService.createInstrument(
      createInstrumentBodyDto,
    );
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async deleteById(@Param('id') id: string) {
    return await this.instrumentService.deleteById(+id);
  }

  @Patch('edit/:id')
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  async editById(
    @Param('id') id: string,
    @Body() editInstrumentBodyDto: EditInstrumentBodyDto,
  ) {
    return await this.instrumentService.editById(+id, editInstrumentBodyDto);
  }
}
