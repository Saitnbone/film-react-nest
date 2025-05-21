import { Module } from '@nestjs/common';
import { FilmsService } from './film.service';
import { FilmController } from './film.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Films } from './entities/film.entity';
import { Schedules } from '../order/entities/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Films, Schedules])],
  controllers: [FilmController],
  providers: [FilmsService],
})
export class FilmsModule {}
