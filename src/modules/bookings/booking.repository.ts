import { AppDataSource } from '@db';
import { Booking } from './booking.entity';

export const BookingRepository = AppDataSource.getRepository(Booking);
