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
import { BonsaiService } from './bonsai.service.js';
import { CreateBonsaiDto, EditBonsaiDto } from './dto/index.js';

@Controller('bonsai')
@UseGuards(AtGuard, RtGuard)
export class BonsaiController {
  constructor(private readonly bonsaiService: BonsaiService) {}

  @AtPublic()
  @RtPublic()
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllBonsai() {
    const allBonsai = await this.bonsaiService.getAllBonsai();
    if (!allBonsai) {
      throw new NotFoundException(EXCEPTION_MSGS.BONSAI_NOT_FOUND);
    }
    return allBonsai;
  }

  @AtPublic()
  @RtPublic()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getBonsaiById(@Param('id') id: string) {
    return await this.bonsaiService.getBonsaiById(+id);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createBonsai(@Body() createBonsaiDto: CreateBonsaiDto) {
    return await this.bonsaiService.createBonsai(createBonsaiDto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async deleteById(@Param('id') id: string) {
    return await this.bonsaiService.deleteById(+id);
  }

  @Patch('edit/:id')
  @HttpCode(HttpStatus.OK)
  async editById(
    @Param('id') id: string,
    @Body() editBonsaiDto: EditBonsaiDto,
  ) {
    return await this.bonsaiService.editById(+id, editBonsaiDto);
  }
}
