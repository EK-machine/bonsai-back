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
import { CreateServiceBodyDto, EditServiceBodyDto } from '../common/dtos/index';
import { AtGuard, RtGuard } from '../common/guards/index';
import { ServiceService } from './service.service.js';

@Controller('service')
@UseGuards(RtGuard, AtGuard)
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @AtPublic()
  @RtPublic()
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllServices() {
    const allServices = await this.serviceService.getAllServices();
    if (!allServices) {
      throw new NotFoundException(EXCEPTION_MSGS.SERVICE_NOT_FOUND);
    }
    return allServices;
  }

  @AtPublic()
  @RtPublic()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getServiceById(@Param('id') id: string) {
    return this.serviceService.getServiceById(+id);
  }

  @Post('create')
  @FormDataRequest()
  @HttpCode(HttpStatus.CREATED)
  async createService(@Body() createServiceBodyDto: CreateServiceBodyDto) {
    return await this.serviceService.createService(createServiceBodyDto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async deleteById(@Param('id') id: string) {
    return await this.serviceService.deleteById(+id);
  }

  @Patch('edit/:id')
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  async editById(
    @Param('id') id: string,
    @Body() editServiceBodyDto: EditServiceBodyDto,
  ) {
    return await this.serviceService.editById(+id, editServiceBodyDto);
  }
}
