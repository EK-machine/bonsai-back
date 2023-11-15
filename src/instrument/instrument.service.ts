import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EXCEPTION_MSGS } from '../common/consts/common.consts.js';
import { Instrument } from '../typeorm/entities/index.js';
import { CreateInstrumentDto, EditInstrumentDto } from './dto/index.js';

@Injectable()
export class InstrumentService {
  constructor(
    @InjectRepository(Instrument)
    private instrumentRepository: Repository<Instrument>,
  ) {}

  async getAllInstruments(): Promise<Instrument[]> {
    return this.instrumentRepository.find();
  }

  async getInstrumentById(id: number): Promise<Instrument> {
    try {
      return await this.instrumentRepository.findOneOrFail({
        where: { id },
      });
    } catch (err) {
      throw new NotFoundException(EXCEPTION_MSGS.INSTRUMENT_NOT_FOUND);
    }
  }

  async createInstrument(
    createInstrument: CreateInstrumentDto,
  ): Promise<Instrument> {
    const newInstrument = this.instrumentRepository.create({
      ...createInstrument,
    });
    return this.instrumentRepository.save(newInstrument);
  }

  async deleteById(id: number): Promise<Instrument> {
    const instrumentToDel = await this.getInstrumentById(id);
    return await this.instrumentRepository.remove(instrumentToDel);
  }

  async editById(id: number, editBody: EditInstrumentDto): Promise<Instrument> {
    let instrumentToUpdate = await this.getInstrumentById(id);
    instrumentToUpdate = { ...instrumentToUpdate, ...editBody };
    return this.instrumentRepository.save(instrumentToUpdate);
  }
}