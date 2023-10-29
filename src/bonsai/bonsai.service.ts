import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bonsai } from '../typeorm/entities/index.js';
import { CreateBonsaiParams } from '../utils/types.js';
import { BONSAI_NOT_FOUND } from './consts/bonsai.constants.js';

@Injectable()
export class BonsaiService {
  constructor(
    @InjectRepository(Bonsai) private bonsaiRepository: Repository<Bonsai>,
  ) {}

  async getAllBonsai() {
    return this.bonsaiRepository.find();
  }

  async getBonsaiById(id: number) {
    return this.bonsaiRepository.findOne({ where: { id } });
  }

  async createBonsai(bonsaiDetails: CreateBonsaiParams) {
    const newBonsai = this.bonsaiRepository.create({ ...bonsaiDetails });
    return this.bonsaiRepository.save(newBonsai);
  }

  async deleteById(id: number) {
    const bonsaiToDel = await this.bonsaiRepository.exist({ where: { id } });
    if (!bonsaiToDel) {
      throw new NotFoundException(BONSAI_NOT_FOUND);
    }
    await this.bonsaiRepository.delete(id);
  }
}
