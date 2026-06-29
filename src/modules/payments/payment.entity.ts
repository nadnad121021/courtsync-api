import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  PaymentMethod,
  PaymentProvider,
  PaymentStatus,
} from './payment.interface';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  bookingId!: string;

  @Column({ type: 'uuid' })
  userId!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount!: number;

  @Column({ default: 'PHP' })
  currency!: string;

  @Column({ type: 'enum', enum: PaymentMethod })
  method!: PaymentMethod;

  @Column({
    type: 'enum',
    enum: PaymentProvider,
    default: PaymentProvider.MANUAL,
  })
  provider!: PaymentProvider;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status!: PaymentStatus;

  @Column({ nullable: true })
  providerReferenceId?: string;

  @Column({ type: 'timestamp', nullable: true })
  paidAt?: Date;

  @Column({ type: 'text', nullable: true })
  failedReason?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}