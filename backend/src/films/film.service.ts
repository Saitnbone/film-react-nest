import { Injectable } from '@nestjs/common';
import { FilmRepository } from '../repository/film.repository';

export interface IFilm {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  title: string;
  about: string;
  description: string;
  image: string;
  cover: string;
}

export interface ISession {
  id: string;
  film: string;
  daytime: string;
  day: string;
  time: string;
  hall: string;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

@Injectable()
export class FilmService {
  constructor(private readonly filmRepository: FilmRepository) {}

  async findAll(): Promise<{ items: IFilm[] }> {
    const films = await this.filmRepository.find();

    const transformedFilms = films.map((film) => ({
      id: film.id,
      rating: film.rating,
      director: film.director,
      tags: film.tags,
      title: film.title,
      about: film.about,
      description: film.description,
      image: film.image,
      cover: film.cover,
    }));

    return { items: transformedFilms };
  }

  async findScheduleById(id: string): Promise<{ items: ISession[] }> {
    const schedule = await this.filmRepository.findScheduleByFilmId(id);
    if (!schedule) {
      return { items: [] };
    }

    const stransformedSchedule = schedule.map((session) => ({
      id: session.id,
      film: id,
      daytime: session.daytime,
      day: session.daytime,
      time: session.daytime,
      hall: session.hall.toString(),
      rows: session.rows,
      seats: session.seats,
      price: session.price,
      taken: session.taken,
    }));
    return { items: stransformedSchedule };
  }
}
