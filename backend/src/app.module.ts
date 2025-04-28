import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import * as mongoose from 'mongoose';
import { configProvider } from './app.config.provider';
import { FilmController } from './films/film.controller';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { FilmService } from './films/film.service';
import { FilmRepository } from './repository/film.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public', 'content', 'afisha'),
      serveRoot: '/content/afisha',
    }),
  ],
  controllers: [FilmController, OrderController],
  providers: [configProvider, OrderService, FilmService, FilmRepository],
})
export class AppModule {
  constructor() {
    mongoose
      .connect(process.env.DATABASE_URL)
      .then(() => {
        console.log('MongoDB подключен');
      })
      .catch((err) => {
        console.error('Ошибка подключения к MongoDB', err);
      });
  }
}
