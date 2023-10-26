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

  async getAll() {
    return this.bonsaiRepository.find();
  }

  async createBonsai(bonsaiDetails: CreateBonsaiParams) {
    const newBonsai = this.bonsaiRepository.create({ ...bonsaiDetails });
    return this.bonsaiRepository.save(newBonsai);
  }
}
