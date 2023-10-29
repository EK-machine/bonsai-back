import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AtPublic } from '../common/decorators/atPublic.decorator.js';
import { AtGuard } from '../common/guards/at.guard.js';
import { BonsaiService } from './bonsai.service.js';
import { BONSAI_NOT_FOUND } from './consts/bonsai.constants.js';
import { CreateBonsaiDto } from './dto/CreateBonsai.dto.js';

@Controller('bonsai')
@UseGuards(AtGuard)
export class BonsaiController {
  constructor(private readonly bonsaiService: BonsaiService) {}

  @AtPublic()
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllBonsai() {
    const allBonsai = await this.bonsaiService.getAllBonsai();
    if (!allBonsai) {
      throw new NotFoundException(BONSAI_NOT_FOUND);
    }
    return allBonsai;
  }

  @AtPublic()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getBonsaiById(@Param('id') id: string) {
    const bonsai = await this.bonsaiService.getBonsaiById(+id);
    if (!bonsai) {
      throw new NotFoundException(BONSAI_NOT_FOUND);
    }
    return bonsai;
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createBonsai(@Body() createBonsaiDto: CreateBonsaiDto) {
    this.bonsaiService.createBonsai(createBonsaiDto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id') id: string) {
    await this.bonsaiService.deleteById(+id);
  }
}
