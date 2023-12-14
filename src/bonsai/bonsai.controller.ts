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
import { CreateBonsaBodyDto, EditBonsaiBodyDto } from '../common/dtos/index';
import { AtGuard, RtGuard } from '../common/guards/index';
import { BonsaiService } from './bonsai.service.js';

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
  @FormDataRequest()
  @HttpCode(HttpStatus.CREATED)
  async createBonsai(@Body() createBonsaBodyDto: CreateBonsaBodyDto) {
    return await this.bonsaiService.createBonsai(createBonsaBodyDto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async deleteById(@Param('id') id: string) {
    return await this.bonsaiService.deleteById(+id);
  }

  @Patch('edit/:id')
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  async editById(
    @Param('id') id: string,
    @Body() editBonsaiBodyDto: EditBonsaiBodyDto,
  ) {
    return await this.bonsaiService.editById(+id, editBonsaiBodyDto);
  }
}
