import { AppDataSource } from '@db';
import { CourtAvailability } from './courtAvailability.entity';

export const CourtAvailabilityRepository =
    AppDataSource.getRepository(CourtAvailability);