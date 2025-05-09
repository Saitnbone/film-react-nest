import { Films } from '../../films/entities/film.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Schedules {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  daytime: string;

  @Column()
  hall: number;

  @Column()
  rows: number;

  @Column()
  seats: number;

  @Column()
  price: number;

  @Column()
  taken: string;

  @Column('uuid')
  filmId: string;

  @ManyToOne(() => Films, (film) => film.id)
  film: Films;
}
