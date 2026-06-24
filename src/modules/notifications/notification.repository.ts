import { AppDataSource } from '@db';
import { Notification } from './notification.entity';

export const NotificationRepository = AppDataSource.getRepository(Notification);
