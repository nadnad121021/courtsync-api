import { AppDataSource } from '@db';
import { Permission } from './permission.entity';

export const PermissionRepository = AppDataSource.getRepository(Permission);
