import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column
} from 'typeorm';
import  { VenueStatus } from './venue.interface';

@Entity('venues')
export class Venue {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  ownerId!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  address!: string;

  @Column()
  city!: string;

  @Column()
  province?: string;

  @Column({nullable:true})
  latitude?: string;

  @Column({nullable:true})
  longitude?: string;

  @Column({nullable:true})
  contactNumber?: string;

  @Column({nullable:true})
  openingTime?: string;

  @Column({
    type: 'enum',
    enum: VenueStatus,
    default: VenueStatus.PENDING,
  })
  status!: VenueStatus;

  @Column({nullable:true})
  closingTime?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
