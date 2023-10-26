import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BonsaiController } from './bonsai/bonsai.controller';
import { BonsaiModule } from './bonsai/bonsai.module';
import { Bonsai, RT, User } from './typeorm/entities/index.js';

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
      entities: [User, Bonsai, RT],
      synchronize: true,
    }),
    BonsaiModule,
    AuthModule,
  ],
  controllers: [AppController, BonsaiController],
  providers: [AppService],
})
export class AppModule {}
