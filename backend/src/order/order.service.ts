import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/order.dto';
import { Schedules } from './entities/schedule.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Schedules)
    private scheduleRepository: Repository<Schedules>,
  ) {}

  async createOrder(createOrderDto: CreateTicketDto) {
    const ticketsArr = createOrderDto.tickets;
    let items = [];

    for (const ticket of ticketsArr) {
      const filmDate = await this.scheduleRepository.findOne({
        where: {
          id: ticket.session,
        },
      });
      if (!filmDate) {
        throw new Error(`Film with id ${ticket.film} not found`);
      }
      const place = `${ticket.row}:${ticket.seat}`;

      if (filmDate.taken == '') {
        filmDate.taken = place;
      } else {
        filmDate.taken = `${filmDate.taken}, ${place}`;
      }

      await this.scheduleRepository.save(filmDate);

      items = [...items, filmDate];
    }

    return { total: items.length, items: items };
  }
}
