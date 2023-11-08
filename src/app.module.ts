import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { BonsaiController } from './bonsai/bonsai.controller';
import { BonsaiModule } from './bonsai/bonsai.module';
import { InstrumentsModule } from './instrument/instrument.module';
import { PotModule } from './pot/pot.module';
import { RelatedController } from './related/related.controller';
import { RelatedModule } from './related/related.module';
import { ServiceModule } from './service/service.module';
import { SoilModule } from './soil/soil.module';
import {
  Article,
  Bonsai,
  Instrument,
  Pot,
  RT,
  Related,
  Service,
  Soil,
  User,
} from './typeorm/entities/index.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        User,
        Bonsai,
        RT,
        Article,
        Service,
        Pot,
        Instrument,
        Soil,
        Related,
      ],
      synchronize: true,
    }),
    BonsaiModule,
    AuthModule,
    ArticleModule,
    ServiceModule,
    PotModule,
    InstrumentsModule,
    SoilModule,
    RelatedModule,
  ],
  controllers: [AppController, BonsaiController, RelatedController],
  providers: [AppService],
})
export class AppModule {}
