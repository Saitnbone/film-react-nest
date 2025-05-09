import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './film.service';

@Controller('films')
export class FilmController {
  constructor(private readonly filmService: FilmsService) {}

  @Get()
  async getFilms() {
    const films = await this.filmService.getAllFilms();
    return films;
  }

  @Get(':id/schedule')
  async getFilmSchedule(@Param('id') id: string) {
    return this.filmService.findFilm(id);
  }
}
