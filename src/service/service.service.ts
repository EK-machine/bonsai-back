import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as path from 'path';
import { Repository } from 'typeorm';
import { EXCEPTION_MSGS } from '../common/consts/index';
import {
  CreateServiceBodyDto,
  CreateServiceDto,
  EditServiceBodyDto,
  EditServiceDto,
} from '../common/dtos/index';
import { Service } from '../common/typeorm-entities/index';
import { deletePics, transformDtoAndStorePics } from '../common/utils/index';

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
      throw new NotFoundException(EXCEPTION_MSGS.SERVICE_NOT_FOUND);
    }
  }

  async createService(
    createServiceBodyDto: CreateServiceBodyDto,
  ): Promise<Service> {
    const storageDirPath = path.resolve(__dirname, '../../../bonsai-pics');
    const createServiceDto = transformDtoAndStorePics<CreateServiceDto>(
      createServiceBodyDto,
      storageDirPath,
    );
    const newService = this.serviceRepository.create({ ...createServiceDto });
    return this.serviceRepository.save(newService);
  }

  async deleteById(id: number): Promise<Service> {
    const serviceToDel = await this.getServiceById(id);
    if (serviceToDel.img_path_1) {
      await deletePics(serviceToDel);
    }
    return await this.serviceRepository.remove(serviceToDel);
  }

  async editById(
    id: number,
    editServiceBodyDto: EditServiceBodyDto,
  ): Promise<Service> {
    const storageDirPath = path.resolve(__dirname, '../../../bonsai-pics');
    const editServiceDto = transformDtoAndStorePics<EditServiceDto>(
      editServiceBodyDto,
      storageDirPath,
    );
    let serviceToEdit = await this.getServiceById(id);
    if (serviceToEdit.img_path_1) {
      await deletePics(serviceToEdit);
    }

    serviceToEdit = { ...serviceToEdit, ...editServiceDto };
    return this.serviceRepository.save(serviceToEdit);
  }
}
