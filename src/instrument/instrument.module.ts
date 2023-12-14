import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { MyNestJsFormDataConfigService } from '../common/configs/index';
import { Instrument } from '../common/typeorm-entities/index';
import { InstrumentController } from './instrument.controller';
import { InstrumentService } from './instrument.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Instrument]),
    NestjsFormDataModule.configAsync({
      imports: [ConfigModule],
      inject: [ConfigModule],
      useClass: MyNestJsFormDataConfigService,
    }),
  ],
  providers: [InstrumentService],
  controllers: [InstrumentController],
  exports: [InstrumentService],
})
export class InstrumentsModule {}
