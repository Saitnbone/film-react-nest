import { Injectable } from '@nestjs/common';
import { Film } from '../films/schemas/film.schema';
import { GetFilmDto } from 'src/films/dto/films.dto';

@Injectable()
export class FilmRepository {
  async find(): Promise<GetFilmDto[]> {
    return Film.find();
  }

  async findScheduleByFilmId(id: string) {
    const film = await Film.findOne({ id }).lean();
    return film?.schedule || null;
  }
}
