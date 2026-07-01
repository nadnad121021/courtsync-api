import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CourtStatus, SportType } from './court.interface';
import { Venue } from '@modules/venues/venue.entity';
import { CourtAvailability } from '@modules/courtAvailability/courtAvailability.entity';
import { Booking } from '@modules/bookings/booking.entity';

@Entity('courts')
export class Court {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  venueId!: string;

  @Column()
  name!: string;

  @Column({
    type: 'enum',
    enum: SportType,
  })
  sportType!: SportType;

  @Column({ nullable: true })
  surfaceType?: string;

  @Column({ default: true })
  indoor!: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  pricePerHour!: number;

  @Column({
    type: 'enum',
    enum: CourtStatus,
    default: CourtStatus.ACTIVE,
  })
  status!: CourtStatus;

  @ManyToOne(() => Venue, (venue) => venue.courts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'venueId' })
  venue: Venue;

  @OneToMany(() => CourtAvailability, (availability) => availability.court)
  availabilities: CourtAvailability[];

  @OneToMany(() => Booking, booking => booking.court)
  bookings: Booking[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}