import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { BonsaiService } from './bonsai.service.js';
import { BONSAI_NOT_FOUND } from './consts/bonsai.constants.js';
import { CreateBonsaiDto } from './dto/CreateBonsai.dto.js';

@Controller('bonsai')
export class BonsaiController {
  constructor(private readonly bonsaiService: BonsaiService) {}
  @Get()
  async getAll() {
    const allBonsai = await this.bonsaiService.getAll();
    if (!allBonsai) {
      throw new NotFoundException(BONSAI_NOT_FOUND);
    }
    return allBonsai;
  }

  @Post('')
  async createBonsai(@Body() createBonsaiDto: CreateBonsaiDto) {
    this.bonsaiService.createBonsai(createBonsaiDto);
  }
}
