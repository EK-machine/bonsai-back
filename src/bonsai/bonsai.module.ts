import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { MyNestJsFormDataConfigService } from '../common/configs/index';
import { Bonsai } from '../common/typeorm-entities/index';
import { BonsaiController } from './bonsai.controller.js';
import { BonsaiService } from './bonsai.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bonsai]),
    NestjsFormDataModule.configAsync({
      imports: [ConfigModule],
      inject: [ConfigModule],
      useClass: MyNestJsFormDataConfigService,
    }),
  ],
  controllers: [BonsaiController],
  providers: [BonsaiService],
  exports: [BonsaiService],
})
export class BonsaiModule {}
