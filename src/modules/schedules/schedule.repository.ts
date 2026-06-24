import { AppDataSource } from '@db';
import { Schedule } from './schedule.entity';

export const ScheduleRepository = AppDataSource.getRepository(Schedule);
