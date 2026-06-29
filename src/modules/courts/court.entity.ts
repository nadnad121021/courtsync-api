import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CourtStatus, SportType } from './court.interface';

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

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}