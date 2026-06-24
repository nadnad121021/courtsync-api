import { AppDataSource } from '@db';
import { Court } from './court.entity';

export const CourtRepository = AppDataSource.getRepository(Court);
