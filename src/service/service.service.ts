import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '../typeorm/entities/index.js';
import { SERVICE_NOT_FOUND } from './consts/service.constants.js';
import { CreateServiceDto, EditServiceDto } from './dto/index.js';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service) private serviceRepository: Repository<Service>,
  ) {}

  async getAllServices(): Promise<Service[]> {
    return this.serviceRepository.find();
  }

  async getServiceById(id: number): Promise<Service> {
    try {
      return await this.serviceRepository.findOneOrFail({
        where: { id },
      });
    } catch (err) {
      throw new NotFoundException(SERVICE_NOT_FOUND);
    }
  }

  async createService(serviceDetails: CreateServiceDto): Promise<Service> {
    const newService = this.serviceRepository.create({ ...serviceDetails });
    return this.serviceRepository.save(newService);
  }

  async deleteById(id: number): Promise<Service> {
    const serviceToDel = await this.getServiceById(id);
    return await this.serviceRepository.remove(serviceToDel);
  }

  async editById(id: number, editBody: EditServiceDto): Promise<Service> {
    let serviceToUpdate = await this.getServiceById(id);
    serviceToUpdate = { ...serviceToUpdate, ...editBody };
    return this.serviceRepository.save(serviceToUpdate);
  }
}
