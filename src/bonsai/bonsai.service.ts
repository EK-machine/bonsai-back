import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as path from 'path';
import { Repository } from 'typeorm';
import { EXCEPTION_MSGS } from '../common/consts/index';
import {
  CreateBonsaBodyDto,
  CreateBonsaiDto,
  EditBonsaiBodyDto,
  EditBonsaiDto,
} from '../common/dtos/index';
import { Bonsai } from '../common/typeorm-entities/index';
import { deletePics, transformDtoAndStorePics } from '../common/utils/index';

@Injectable()
export class BonsaiService {
  constructor(
    @InjectRepository(Bonsai) private bonsaiRepository: Repository<Bonsai>,
  ) {}

  async getAllBonsai(): Promise<Bonsai[]> {
    return this.bonsaiRepository.find();
  }

  async getBonsaiById(id: number): Promise<Bonsai> {
    try {
      return await this.bonsaiRepository.findOneOrFail({
        where: { id },
      });
    } catch (err) {
      throw new NotFoundException(EXCEPTION_MSGS.BONSAI_NOT_FOUND);
    }
  }

  async createBonsai(createBonsaBodyDto: CreateBonsaBodyDto): Promise<Bonsai> {
    const storageDirPath = path.resolve(__dirname, '../../../bonsai-pics');
    const createBonsaiDto = transformDtoAndStorePics<CreateBonsaiDto>(
      createBonsaBodyDto,
      storageDirPath,
    );
    const newBonsai = this.bonsaiRepository.create({ ...createBonsaiDto });
    return this.bonsaiRepository.save(newBonsai);
  }

  async deleteById(id: number): Promise<Bonsai> {
    const bonsaiToDel = await this.getBonsaiById(id);
    if (bonsaiToDel.img_path_1) {
      await deletePics(bonsaiToDel);
    }
    return await this.bonsaiRepository.remove(bonsaiToDel);
  }

  async editById(
    id: number,
    editBonsaiBodyDto: EditBonsaiBodyDto,
  ): Promise<Bonsai> {
    const storageDirPath = path.resolve(__dirname, '../../../bonsai-pics');
    const editBonsaiDto = transformDtoAndStorePics<EditBonsaiDto>(
      editBonsaiBodyDto,
      storageDirPath,
    );

    let bonsaiToEdit = await this.getBonsaiById(id);
    if (
      bonsaiToEdit.img_path_1 ||
      bonsaiToEdit.img_path_2 ||
      bonsaiToEdit.img_path_3
    ) {
      await deletePics(bonsaiToEdit);
    }

    bonsaiToEdit = { ...bonsaiToEdit, ...editBonsaiDto };
    return this.bonsaiRepository.save(bonsaiToEdit);
  }
}
