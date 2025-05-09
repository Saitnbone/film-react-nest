import { Schedules } from '../../order/entities/schedule.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Films {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float')
  rating: number;

  @Column()
  director: string;

  @Column()
  tags: string;

  @Column()
  image: string;

  @Column()
  cover: string;

  @Column()
  title: string;

  @Column()
  about: string;

  @Column()
  description: string;

  @OneToMany(() => Schedules, (order) => order.film)
  schedule: Schedules[];
}
