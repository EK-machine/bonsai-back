import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as path from 'path';
import { Repository } from 'typeorm';
import { EXCEPTION_MSGS } from '../common/consts/index';
import {
  CreateInstrumentBodyDto,
  CreateInstrumentDto,
  EditInstrumentBodyDto,
  EditInstrumentDto,
} from '../common/dtos/index';
import { Instrument } from '../common/typeorm-entities/index';
import { deletePics, transformDtoAndStorePics } from '../common/utils/index';

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
    createInstrumentBodyDto: CreateInstrumentBodyDto,
  ): Promise<Instrument> {
    const storageDirPath = path.resolve(__dirname, '../../../bonsai-pics');
    const createInstrumentDto = transformDtoAndStorePics<CreateInstrumentDto>(
      createInstrumentBodyDto,
      storageDirPath,
    );
    const newInstrument = this.instrumentRepository.create({
      ...createInstrumentDto,
    });
    return this.instrumentRepository.save(newInstrument);
  }

  async deleteById(id: number): Promise<Instrument> {
    const instrumentToDel = await this.getInstrumentById(id);
    if (instrumentToDel.img_path_1) {
      await deletePics(instrumentToDel);
    }
    return await this.instrumentRepository.remove(instrumentToDel);
  }

  async editById(
    id: number,
    editInstrumentBodyDto: EditInstrumentBodyDto,
  ): Promise<Instrument> {
    const storageDirPath = path.resolve(__dirname, '../../../bonsai-pics');
    const editInstrumentDto = transformDtoAndStorePics<EditInstrumentDto>(
      editInstrumentBodyDto,
      storageDirPath,
    );

    let instrumentToEdit = await this.getInstrumentById(id);
    if (instrumentToEdit.img_path_1) {
      await deletePics(instrumentToEdit);
    }
    instrumentToEdit = { ...instrumentToEdit, ...editInstrumentDto };
    return this.instrumentRepository.save(instrumentToEdit);
  }
}
