import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Related } from '../typeorm/entities/index.js';
import { RelatedController } from './related.controller.js';
import { RelatedService } from './related.service';

@Module({
  imports: [TypeOrmModule.forFeature([Related])],
  controllers: [RelatedController],
  providers: [RelatedService],
  exports: [RelatedService],
})
export class RelatedModule {}
