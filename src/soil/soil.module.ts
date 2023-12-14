import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { MyNestJsFormDataConfigService } from '../common/configs/index';
import { Soil } from '../common/typeorm-entities/index';
import { SoilController } from './soil.controller';
import { SoilService } from './soil.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Soil]),
    NestjsFormDataModule.configAsync({
      imports: [ConfigModule],
      inject: [ConfigModule],
      useClass: MyNestJsFormDataConfigService,
    }),
  ],
  providers: [SoilService],
  controllers: [SoilController],
  exports: [SoilService],
})
export class SoilModule {}
