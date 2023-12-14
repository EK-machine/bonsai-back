import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EXCEPTION_MSGS } from '../common/consts/index';
import { CreateBonsaiDto, EditBonsaiDto } from '../common/dtos/index';
import { Bonsai } from '../common/typeorm-entities/index';

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

  async createBonsai(bonsaiDetails: CreateBonsaiDto): Promise<Bonsai> {
    const newBonsai = this.bonsaiRepository.create({ ...bonsaiDetails });
    return this.bonsaiRepository.save(newBonsai);
  }

  async deleteById(id: number): Promise<Bonsai> {
    const bonsaiToDel = await this.getBonsaiById(id);
    return await this.bonsaiRepository.remove(bonsaiToDel);
  }

  async editById(id: number, editBody: EditBonsaiDto): Promise<Bonsai> {
    let bonsaiToUpdate = await this.getBonsaiById(id);
    bonsaiToUpdate = { ...bonsaiToUpdate, ...editBody };
    return this.bonsaiRepository.save(bonsaiToUpdate);
  }
}
