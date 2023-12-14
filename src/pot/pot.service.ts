import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as path from 'path';
import { Repository } from 'typeorm';
import { EXCEPTION_MSGS } from '../common/consts/index';
import {
  CreatePotBodyDto,
  CreatePotDto,
  EditPotBodyDto,
  EditPotDto,
} from '../common/dtos/index';
import { Pot } from '../common/typeorm-entities/index';
import { deletePics, transformDtoAndStorePics } from '../common/utils/index';

@Injectable()
export class PotService {
  constructor(@InjectRepository(Pot) private potRepository: Repository<Pot>) {}

  async getAllPots(): Promise<Pot[]> {
    return this.potRepository.find();
  }

  async getPotById(id: number): Promise<Pot> {
    try {
      return await this.potRepository.findOneOrFail({
        where: { id },
      });
    } catch (err) {
      throw new NotFoundException(EXCEPTION_MSGS.POT_NOT_FOUND);
    }
  }

  async createPot(createPotBodyDto: CreatePotBodyDto): Promise<Pot> {
    const storageDirPath = path.resolve(__dirname, '../../../bonsai-pics');
    const createPotDto = transformDtoAndStorePics<CreatePotDto>(
      createPotBodyDto,
      storageDirPath,
    );
    const newPot = this.potRepository.create({ ...createPotDto });
    return this.potRepository.save(newPot);
  }

  async deleteById(id: number): Promise<Pot> {
    const potToDel = await this.getPotById(id);
    if (potToDel.img_path_1) {
      await deletePics(potToDel);
    }
    return await this.potRepository.remove(potToDel);
  }

  async editById(id: number, editPotBodyDto: EditPotBodyDto): Promise<Pot> {
    const storageDirPath = path.resolve(__dirname, '../../../bonsai-pics');
    const editPotDto = transformDtoAndStorePics<EditPotDto>(
      editPotBodyDto,
      storageDirPath,
    );

    let potToEdit = await this.getPotById(id);
    if (potToEdit.img_path_1) {
      await deletePics(potToEdit);
    }
    potToEdit = { ...potToEdit, ...editPotDto };
    return this.potRepository.save(potToEdit);
  }
}
