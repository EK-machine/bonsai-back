import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pot } from '../typeorm/entities/pot.entity.js';
import { PotController } from './pot.controller';
import { PotService } from './pot.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pot])],
  controllers: [PotController],
  providers: [PotService],
  exports: [PotService],
})
export class PotModule {}
