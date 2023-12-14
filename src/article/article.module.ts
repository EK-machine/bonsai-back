import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { MyNestJsFormDataConfigService } from '../common/configs/index';
import { Article } from '../common/typeorm-entities/index';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    NestjsFormDataModule.configAsync({
      imports: [ConfigModule],
      inject: [ConfigModule],
      useClass: MyNestJsFormDataConfigService,
    }),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
