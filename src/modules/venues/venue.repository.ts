import { AppDataSource } from '@db';
import { Venue } from './venue.entity';

export const VenueRepository = AppDataSource.getRepository(Venue);
