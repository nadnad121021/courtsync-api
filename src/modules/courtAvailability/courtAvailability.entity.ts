import { Court } from "@modules/courts/court.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('court_availabilities')
export class CourtAvailability {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  courtId: string;

  @ManyToOne(() => Court, (court) => court.availabilities, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'courtId' })
  court: Court;

  @Column()
  dayOfWeek: number; // 0 = Sunday, 1 = Monday ... 6 = Saturday

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;

  @Column({ default: true })
  isAvailable: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}