import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { MyNestJsFormDataConfigService } from '../common/configs/index';
import { Pot } from '../common/typeorm-entities/index';
import { PotController } from './pot.controller';
import { PotService } from './pot.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pot]),
    NestjsFormDataModule.configAsync({
      imports: [ConfigModule],
      inject: [ConfigModule],
      useClass: MyNestJsFormDataConfigService,
    }),
  ],
  controllers: [PotController],
  providers: [PotService],
  exports: [PotService],
})
export class PotModule {}
