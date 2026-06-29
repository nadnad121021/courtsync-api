import { AppDataSource } from '@db';
import { Role } from './role.entity';

export const RoleRepository = AppDataSource.getRepository(Role);
