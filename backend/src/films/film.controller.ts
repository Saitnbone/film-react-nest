import { Controller, Get, Param } from '@nestjs/common';
import { FilmService } from './film.service';

@Controller('films')
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @Get()
  async getFilms() {
    const films = await this.filmService.findAll();
    return films;
  }

  @Get(':id/schedule')
  async getFilmSchedule(@Param('id') id: string) {
    return this.filmService.findScheduleById(id);
  }
}
