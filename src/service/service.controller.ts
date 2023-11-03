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
import { AtPublic, RtPublic } from '../common/decorators/index.js';
import { AtGuard, RtGuard } from '../common/guards/index.js';
import { SERVICE_NOT_FOUND } from './consts/service.constants.js';
import { CreateServiceDto, EditServiceDto } from './dto/index.js';
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
      throw new NotFoundException(SERVICE_NOT_FOUND);
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
  @HttpCode(HttpStatus.CREATED)
  async createService(@Body() createServiceDto: CreateServiceDto) {
    return await this.serviceService.createService(createServiceDto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async deleteById(@Param('id') id: string) {
    return await this.serviceService.deleteById(+id);
  }

  @Patch('edit/:id')
  @HttpCode(HttpStatus.OK)
  async editById(
    @Param('id') id: string,
    @Body() editServiceDto: EditServiceDto,
  ) {
    return await this.serviceService.editById(+id, editServiceDto);
  }
}
