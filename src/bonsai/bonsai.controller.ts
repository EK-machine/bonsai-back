import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { BonsaiService } from './bonsai.service.js';
import { BONSAI_NOT_FOUND } from './consts/bonsai.constants.js';
import { CreateBonsaiDto } from './dto/CreateBonsai.dto.js';

@Controller('bonsai')
export class BonsaiController {
  constructor(private readonly bonsaiService: BonsaiService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllBonsai() {
    const allBonsai = await this.bonsaiService.getAllBonsai();
    if (!allBonsai) {
      throw new NotFoundException(BONSAI_NOT_FOUND);
    }
    return allBonsai;
  }

  @Get(':id')
  async getBonsaiById(@Param('id') id: string) {
    const bonsai = await this.bonsaiService.getBonsaiById(+id);
    if (!bonsai) {
      throw new NotFoundException(BONSAI_NOT_FOUND);
    }
    return bonsai;
  }

  @Post('create')
  async createBonsai(@Body() createBonsaiDto: CreateBonsaiDto) {
    this.bonsaiService.createBonsai(createBonsaiDto);
  }
}
