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
import { EXCEPTION_MSGS } from '../common/consts/common.consts.js';
import { AtPublic, RtPublic } from '../common/decorators/index.js';
import { AtGuard, RtGuard } from '../common/guards/index.js';
import { CreateInstrumentDto, EditInstrumentDto } from './dto/index.js';
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
  @HttpCode(HttpStatus.CREATED)
  async createInstrument(@Body() createInstrument: CreateInstrumentDto) {
    return await this.instrumentService.createInstrument(createInstrument);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async deleteById(@Param('id') id: string) {
    return await this.instrumentService.deleteById(+id);
  }

  @Patch('edit/:id')
  @HttpCode(HttpStatus.OK)
  async editById(
    @Param('id') id: string,
    @Body() editServiceDto: EditInstrumentDto,
  ) {
    return await this.instrumentService.editById(+id, editServiceDto);
  }
}
