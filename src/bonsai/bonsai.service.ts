import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bonsai } from '../typeorm/entities/index.js';
import { CreateBonsaiParams } from '../utils/types.js';

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
}
