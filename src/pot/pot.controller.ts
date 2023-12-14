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
import { CreatePotBodyDto, EditPotBodyDto } from '../common/dtos/index';
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
  @FormDataRequest()
  @HttpCode(HttpStatus.CREATED)
  async createPot(@Body() createPotBodyDto: CreatePotBodyDto) {
    return await this.potService.createPot(createPotBodyDto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async deleteById(@Param('id') id: string) {
    return await this.potService.deleteById(+id);
  }

  @Patch('edit/:id')
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  async editById(
    @Param('id') id: string,
    @Body() editPotBodyDto: EditPotBodyDto,
  ) {
    return await this.potService.editById(+id, editPotBodyDto);
  }
}
