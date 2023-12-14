import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EXCEPTION_MSGS } from '../common/consts/index';
import { CreatePotDto, EditPotDto } from '../common/dtos/index';
import { Pot } from '../common/typeorm-entities/index';

@Injectable()
export class PotService {
  constructor(
    @InjectRepository(Pot) private serviceRepository: Repository<Pot>,
  ) {}

  async getAllPots(): Promise<Pot[]> {
    return this.serviceRepository.find();
  }

  async getPotById(id: number): Promise<Pot> {
    try {
      return await this.serviceRepository.findOneOrFail({
        where: { id },
      });
    } catch (err) {
      throw new NotFoundException(EXCEPTION_MSGS.POT_NOT_FOUND);
    }
  }

  async createPot(serviceDetails: CreatePotDto): Promise<Pot> {
    const newService = this.serviceRepository.create({ ...serviceDetails });
    return this.serviceRepository.save(newService);
  }

  async deleteById(id: number): Promise<Pot> {
    const serviceToDel = await this.getPotById(id);
    return await this.serviceRepository.remove(serviceToDel);
  }

  async editById(id: number, editBody: EditPotDto): Promise<Pot> {
    let serviceToUpdate = await this.getPotById(id);
    serviceToUpdate = { ...serviceToUpdate, ...editBody };
    return this.serviceRepository.save(serviceToUpdate);
  }
}
