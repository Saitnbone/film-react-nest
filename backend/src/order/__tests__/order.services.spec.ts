import { Test } from '@nestjs/testing';
import { OrderService } from '../order.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedules } from '../entities/schedule.entity';
import { CreateTicketDto } from '../dto/order.dto';

describe('OrderService', () => {
  let orderService: OrderService;
  let scheduleRepository: jest.Mocked<Repository<Schedules>>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Schedules),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    orderService = moduleRef.get<OrderService>(OrderService);
    scheduleRepository = moduleRef.get(getRepositoryToken(Schedules));
  });

  describe('createOrder', () => {
    it('Добавляет место к уже существующему taken', async () => {
      const mockSchedule: Schedules = {
        id: 'session123',
        daytime: '12:00',
        hall: 1,
        rows: 10,
        seats: 100,
        price: 500,
        filmId: 'film123',
        taken: '2:4, 3:2',
        film: {} as any,
      };

      const dto: CreateTicketDto = {
        email: 'test@test.ru',
        phone: '785943435',
        tickets: [
          {
            day: '2025-05-22',
            daytime: '12:00',
            film: 'film123',
            price: 500,
            row: 5,
            seat: 7,
            session: 'session123',
            time: '12:00',
          },
        ],
      };

      scheduleRepository.findOne.mockResolvedValue(mockSchedule);
      scheduleRepository.save.mockResolvedValue({
        ...mockSchedule,
        taken: '2:4, 3:2, 5:7',
      });

      const result = await orderService.createOrder(dto);

      expect(scheduleRepository.save).toHaveBeenCalledWith({
        ...mockSchedule,
        taken: '2:4, 3:2, 5:7',
      });

      expect(result).toEqual({
        total: 1,
        items: [
          {
            ...mockSchedule,
            taken: '2:4, 3:2, 5:7',
          },
        ],
      });
    });
  });
});
