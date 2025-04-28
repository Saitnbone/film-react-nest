import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateTicketDto } from './dto/order.dto';
import { SessionModel } from './schemas/order.schema';

@Injectable()
export class OrderService {
  async createOrder(createTicketDto: CreateTicketDto) {
    const { tickets } = createTicketDto;

    const sessionTicketsMap = new Map<
      string,
      { row: number; seat: number }[]
    >();

    for (const ticket of tickets) {
      const seats = sessionTicketsMap.get(ticket.session) || [];
      seats.push({ row: ticket.row, seat: ticket.seat });
      sessionTicketsMap.set(ticket.session, seats);
    }

    for (const [sessionId, seats] of sessionTicketsMap.entries()) {
      let session = await this.getSessionById(sessionId);

      if (!session) {
        const sessionDetails = {
          day: tickets[0].day,
          daytime: tickets[0].daytime,
          film: tickets[0].film,
          price: tickets[0].price,
          hall: '1',
          rows: 5,
          seats: 20,
        };
        session = await this.createSession(sessionId, sessionDetails);
      }

      if (!session) {
        throw new BadRequestException(`Session ${sessionId} not found`);
      }

      // список занятых мест
      const takenSeats = session.taken || [];

      // Проверка на пересечение
      for (const seat of seats) {
        const seatKey = `${seat.row}:${seat.seat}`;
        if (takenSeats.includes(seatKey)) {
          throw new BadRequestException(`Seat ${seatKey} already taken`);
        }
      }

      const newTakenSeats = seats.map((seat) => `${seat.row}:${seat.seat}`);
      session.taken = [...takenSeats, ...newTakenSeats];

      await session.save();
    }

    const orderedTickets = tickets.map((ticket) => ({
      ...ticket,
      id: this.generateId(),
    }));

    return {
      total: orderedTickets.length,
      items: orderedTickets,
    };
  }

  private async createSession(
    sessionId: string,
    sessionDetails: {
      day: string;
      daytime: string;
      film: string;
      price: number;
      hall: string;
      rows: number;
      seats: number;
    },
  ) {
    const newSessionData = {
      _id: sessionId,
      day: sessionDetails.day,
      daytime: sessionDetails.daytime,
      film: sessionDetails.film,
      price: sessionDetails.price,
      hall: sessionDetails.hall,
      rows: sessionDetails.rows,
      seats: sessionDetails.seats,
      taken: [],
    };

    const session = new SessionModel(newSessionData);
    await session.save();
    return session;
  }

  private async getSessionById(sessionId: string) {
    try {
      return await SessionModel.findById(sessionId);
    } catch (error) {
      throw new BadRequestException(`Session ${sessionId} not found`);
    }
  }

  private generateId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
