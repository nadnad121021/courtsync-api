import { AppDataSource } from '@db';

import PermissionSeeder from './001-permission.seed';
import RoleSeeder from './002-role.seed';
import SuperAdminSeeder from './003-super-admin.seed';

async function seed() {
  try {
    await AppDataSource.initialize();

    console.log('🌱 Starting seed...');

    await new PermissionSeeder().run(AppDataSource);

    await new RoleSeeder().run(AppDataSource);
    await new SuperAdminSeeder().run(AppDataSource);

    console.log('✅ Seed completed successfully');

    await AppDataSource.destroy();
    process.exit(0);
  } catch (error) {
    console.error(error);

    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }

    process.exit(1);
  }
}

seed();