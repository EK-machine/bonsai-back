import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Soil } from '../common/typeorm-entities/index';
import { SoilController } from './soil.controller';
import { SoilService } from './soil.service';

@Module({
  imports: [TypeOrmModule.forFeature([Soil])],
  providers: [SoilService],
  controllers: [SoilController],
  exports: [SoilService],
})
export class SoilModule {}
