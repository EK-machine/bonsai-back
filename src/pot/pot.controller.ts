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
import { EXCEPTION_MSGS } from '../common/consts/index';
import { AtPublic, RtPublic } from '../common/decorators/index';
import { CreatePotDto, EditPotDto } from '../common/dtos/index';
import { AtGuard, RtGuard } from '../common/guards/index';
import { PotService } from './pot.service.js';

@Controller('related/pot')
@UseGuards(RtGuard, AtGuard)
export class PotController {
  constructor(private readonly potService: PotService) {}

  @AtPublic()
  @RtPublic()
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllPots() {
    const allPots = await this.potService.getAllPots();
    if (!allPots) {
      throw new NotFoundException(EXCEPTION_MSGS.POT_NOT_FOUND);
    }
    return allPots;
  }

  @AtPublic()
  @RtPublic()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getPotById(@Param('id') id: string) {
    return this.potService.getPotById(+id);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createPot(@Body() createPotDto: CreatePotDto) {
    return await this.potService.createPot(createPotDto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async deleteById(@Param('id') id: string) {
    return await this.potService.deleteById(+id);
  }

  @Patch('edit/:id')
  @HttpCode(HttpStatus.OK)
  async editById(@Param('id') id: string, @Body() editPotDto: EditPotDto) {
    return await this.potService.editById(+id, editPotDto);
  }
}
