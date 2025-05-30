import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Films } from './entities/film.entity';
import { Schedules } from '../order/entities/schedule.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Films)
    private filmRepository: Repository<Films>,
    @InjectRepository(Schedules)
    private scheduleRepository: Repository<Schedules>,
  ) {}
  async getAllFilms() {
    const data = await this.filmRepository.find();

    const films = data.map((film) => ({
      ...film,
      description: film.about,
    }));

    return {
      total: films.length,
      items: films,
    };
  }

  async findFilm(id: string) {
    const data = await this.scheduleRepository.find({
      where: { filmId: id },
    });

    const schedule = data.map((item) => {
      return {
        ...item,
        taken: item.taken.split(','),
      };
    });
    return {
      total: schedule.length,
      items: schedule,
    };
  }
}
