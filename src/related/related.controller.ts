import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AtPublic, RtPublic } from '../common/decorators/index.js';
import { AtGuard, RtGuard } from '../common/guards/index.js';
import { CreateRelatedDto, EditRelatedDto } from './dto/index.js';
import { RelatedService } from './related.service.js';

@Controller('related')
@UseGuards(RtGuard, AtGuard)
export class RelatedController {
  constructor(private readonly relatedService: RelatedService) {}

  @AtPublic()
  @RtPublic()
  @Get()
  @HttpCode(HttpStatus.OK)
  async getRelated() {
    return await this.relatedService.getRelated();
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createRelated(@Body() createRelated: CreateRelatedDto) {
    return await this.relatedService.createRelated(createRelated);
  }

  @Patch('edit')
  @HttpCode(HttpStatus.OK)
  async edit(@Body() editSoilDto: EditRelatedDto) {
    return await this.relatedService.edit(editSoilDto);
  }
}
