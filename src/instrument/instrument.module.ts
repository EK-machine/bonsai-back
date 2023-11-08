import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instrument } from '../typeorm/entities/instrument.entity.js';
import { InstrumentController } from './instrument.controller';
import { InstrumentService } from './instrument.service';

@Module({
  imports: [TypeOrmModule.forFeature([Instrument])],
  providers: [InstrumentService],
  controllers: [InstrumentController],
  exports: [InstrumentService],
})
export class InstrumentsModule {}
