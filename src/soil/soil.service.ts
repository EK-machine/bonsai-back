import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as path from 'path';
import { Repository } from 'typeorm';
import { EXCEPTION_MSGS } from '../common/consts/index';
import {
  CreateSoilBodyDto,
  CreateSoilDto,
  EditSoilBodyDto,
  EditSoilDto,
} from '../common/dtos/index';
import { Soil } from '../common/typeorm-entities/index';
import { deletePics, transformDtoAndStorePics } from '../common/utils/index';

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

  async createSoil(createSoilBodyDto: CreateSoilBodyDto): Promise<Soil> {
    const storageDirPath = path.resolve(__dirname, '../../../bonsai-pics');
    const createSoilDto = transformDtoAndStorePics<CreateSoilDto>(
      createSoilBodyDto,
      storageDirPath,
    );
    const newSoil = this.soilRepository.create({
      ...createSoilDto,
    });
    return this.soilRepository.save(newSoil);
  }

  async deleteById(id: number): Promise<Soil> {
    const soilToDel = await this.getSoilById(id);
    if (soilToDel.img_path_1) {
      await deletePics(soilToDel);
    }
    return await this.soilRepository.remove(soilToDel);
  }

  async editById(id: number, editSoilBodyDto: EditSoilBodyDto): Promise<Soil> {
    const storageDirPath = path.resolve(__dirname, '../../../bonsai-pics');
    const editSoilDto = transformDtoAndStorePics<EditSoilDto>(
      editSoilBodyDto,
      storageDirPath,
    );

    let soilToEdit = await this.getSoilById(id);
    if (soilToEdit.img_path_1) {
      await deletePics(soilToEdit);
    }

    soilToEdit = { ...soilToEdit, ...editSoilDto };
    return this.soilRepository.save(soilToEdit);
  }
}
