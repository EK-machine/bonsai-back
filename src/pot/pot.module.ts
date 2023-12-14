import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pot } from '../common/typeorm-entities/index';
import { PotController } from './pot.controller';
import { PotService } from './pot.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pot])],
  controllers: [PotController],
  providers: [PotService],
  exports: [PotService],
})
export class PotModule {}
