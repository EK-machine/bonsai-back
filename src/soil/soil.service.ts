import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EXCEPTION_MSGS } from '../common/consts/common.consts.js';
import { Soil } from '../typeorm/entities/index.js';
import { CreateSoilDto, EditSoilDto } from './dto/index.js';

@Injectable()
export class SoilService {
  constructor(
    @InjectRepository(Soil)
    private soilRepository: Repository<Soil>,
  ) {}

  async getAllSoils(): Promise<Soil[]> {
    return this.soilRepository.find();
  }

  async getSoilById(id: number): Promise<Soil> {
    try {
      return await this.soilRepository.findOneOrFail({
        where: { id },
      });
    } catch (err) {
      throw new NotFoundException(EXCEPTION_MSGS.SOIL_NOT_FOUND);
    }
  }

  async createSoil(createSoil: CreateSoilDto): Promise<Soil> {
    const newSoil = this.soilRepository.create({
      ...createSoil,
    });
    return this.soilRepository.save(newSoil);
  }

  async deleteById(id: number): Promise<Soil> {
    const soilToDel = await this.getSoilById(id);
    return await this.soilRepository.remove(soilToDel);
  }

  async editById(id: number, editBody: EditSoilDto): Promise<Soil> {
    let soilToUpdate = await this.getSoilById(id);
    soilToUpdate = { ...soilToUpdate, ...editBody };
    return this.soilRepository.save(soilToUpdate);
  }
}
