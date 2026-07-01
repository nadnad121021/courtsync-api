
import { getDatabaseConfig } from '../config/index';
import { User } from '@modules/users/user.entity';
import { DataSource } from 'typeorm';
import { Client } from 'pg';
import { Venue } from '@modules/venues/venue.entity';
import { Booking } from '@modules/bookings/booking.entity';
import { Court } from '@modules/courts/court.entity';
import { Payment } from '@modules/payments/payment.entity';
import { Notification } from '@modules/notifications/notification.entity';
import { Role } from '@modules/roles/role.entity';
import { Permission } from '@modules/permissions/permission.entity';
import { CourtAvailability } from '@modules/courtAvailability/courtAvailability.entity';

const dbConfig = getDatabaseConfig();
const nodeEnv = dbConfig.nodeEnv;

const baseOptions = {
  synchronize: dbConfig.synchronize,
  logging: dbConfig.logging,
  entities: [User, Venue, Booking, Court, Payment, Notification, Role, Permission , CourtAvailability],
  migrations: nodeEnv === 'development'
    ? ['src/db/migrations/**/*.ts']
    : ['dist/db/migrations/**/*.js'],
  subscribers: nodeEnv === 'development'
    ? ['src/db/subscribers/**/*.ts']
    : ['dist/db/subscribers/**/*.js'],
  seeds: nodeEnv === 'development'
    ? ['src/db/seeds/**/*.ts']
    : ['dist/db/seeds/**/*.js'],
};

let dataSourceOptions: any = {};
if (dbConfig.type === 'mongodb') {
  dataSourceOptions = {
    ...baseOptions,
    type: 'mongodb',
    url: dbConfig.url || `mongodb://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`,
    useUnifiedTopology: true,
  };
} else {
  const useSSL = dbConfig.ssl || false;
  dataSourceOptions = {
    ...baseOptions,
    type: dbConfig.type,
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    url: dbConfig.url || undefined,
    ssl: useSSL
      ? { rejectUnauthorized: false }
      : false,
    extra: useSSL
      ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
      : undefined,
    migrationsRun: nodeEnv === 'production', // Automatically run migrations in production
  };
}

export const AppDataSource = new DataSource(dataSourceOptions);
