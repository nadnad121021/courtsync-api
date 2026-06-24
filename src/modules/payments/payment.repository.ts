import { AppDataSource } from '@db';
import { Payment } from './payment.entity';

export const PaymentRepository = AppDataSource.getRepository(Payment);
