import { Test } from '@nestjs/testing';
import { FilmsService } from '../film.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Films } from '../entities/film.entity';
import { Schedules } from '../../order/entities/schedule.entity';

describe('FilmService', () => {
  let filmsService: FilmsService;
  let filmRepository: Repository<Films>;
  let scheduleRepository: Repository<Schedules>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: getRepositoryToken(Films),
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Schedules),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    filmsService = moduleRef.get<FilmsService>(FilmsService);
    filmRepository = moduleRef.get<Repository<Films>>(
      getRepositoryToken(Films),
    );
    scheduleRepository = moduleRef.get<Repository<Schedules>>(
      getRepositoryToken(Schedules),
    );
  });

  describe('getAllFilms', () => {
    it('должен вернуть фильмы', async () => {
      const mockFilms = [
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          rating: 4,
          director: 'Some director',
          tags: 'action,drama',
          title: 'Some title',
          about: 'Some about',
          description: 'Some about',
          image: 'img',
          cover: 'cover',
          schedule: [
            {
              id: '1',
              daytime: 'daytime',
              hall: 1,
              rows: 1,
              seats: 2,
              price: 2,
              taken: '1,2',
            },
          ],
        },
      ];

      jest
        .spyOn(filmRepository, 'find')
        .mockResolvedValue(mockFilms as Films[]);

      const result = await filmsService.getAllFilms();

      expect(result).toEqual({
        total: 1,
        items: [
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            rating: 4,
            director: 'Some director',
            tags: 'action,drama',
            title: 'Some title',
            about: 'Some about',
            description: 'Some about',
            image: 'img',
            cover: 'cover',
            schedule: [
              {
                id: '1',
                daytime: 'daytime',
                hall: 1,
                rows: 1,
                seats: 2,
                price: 2,
                taken: '1,2',
              },
            ],
          },
        ],
      });
    });
  });

  describe('findFilmById', () => {
    it('Должен вернуть фильм с taken и total', async () => {
      const mockSchedule = [
        {
          id: '1',
          daytime: '12:00',
          hall: 1,
          rows: 10,
          seats: 100,
          price: 500,
          taken: '1,2,3',
          filmId: 'film123',
        },
        {
          id: '2',
          daytime: '16:00',
          hall: 2,
          rows: 8,
          seats: 80,
          price: 400,
          taken: '4,5',
          filmId: 'film123',
        },
      ];

      jest
        .spyOn(scheduleRepository, 'find')
        .mockResolvedValue(mockSchedule as any);
      const result = await filmsService.findFilm('film123');

      expect(result).toEqual({
        total: 2,
        items: [
          {
            id: '1',
            daytime: '12:00',
            hall: 1,
            rows: 10,
            seats: 100,
            price: 500,
            taken: ['1', '2', '3'],
            filmId: 'film123',
          },
          {
            id: '2',
            daytime: '16:00',
            hall: 2,
            rows: 8,
            seats: 80,
            price: 400,
            taken: ['4', '5'],
            filmId: 'film123',
          },
        ],
      });
    });
  });
});
