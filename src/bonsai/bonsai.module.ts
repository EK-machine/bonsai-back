import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bonsai } from '../typeorm/entities/index.js';
import { BonsaiController } from './bonsai.controller.js';
import { BonsaiService } from './bonsai.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bonsai])],
  controllers: [BonsaiController],
  providers: [BonsaiService],
  exports: [BonsaiService],
})
export class BonsaiModule {}
