import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Related } from '../typeorm/entities/index.js';
import { RELATED_DATA, RELATED_NOT_FOUND } from './consts/soil.constants.js';
import { CreateRelatedDto, EditRelatedDto } from './dto/index.js';

@Injectable()
export class RelatedService {
  constructor(
    @InjectRepository(Related)
    private relatedRepository: Repository<Related>,
  ) {}

  async getRelated(): Promise<Related[]> {
    const related = await this.relatedRepository.find();
    const isRelated = related && related.length > 0;
    if (!isRelated) {
      throw new NotFoundException(RELATED_NOT_FOUND);
    }
    return related;
  }

  async createRelated(createRelated: CreateRelatedDto): Promise<Related> {
    const oldRelated = await this.getRelated();
    if (oldRelated && oldRelated.length > 0) {
      throw new ForbiddenException(RELATED_DATA);
    }
    const newRelated = this.relatedRepository.create({
      ...createRelated,
    });
    return this.relatedRepository.save(newRelated);
  }

  async edit(editBody: EditRelatedDto): Promise<Related> {
    const relatedArr = await this.getRelated();
    let relatedToUpdate = relatedArr[0];
    relatedToUpdate = { ...relatedToUpdate, ...editBody };
    return this.relatedRepository.save(relatedToUpdate);
  }
}
