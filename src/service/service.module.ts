import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { MyNestJsFormDataConfigService } from '../common/configs/index';
import { Service } from '../common/typeorm-entities/index';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Service]),
    NestjsFormDataModule.configAsync({
      imports: [ConfigModule],
      inject: [ConfigModule],
      useClass: MyNestJsFormDataConfigService,
    }),
  ],
  controllers: [ServiceController],
  providers: [ServiceService],
  exports: [ServiceService],
})
export class ServiceModule {}
