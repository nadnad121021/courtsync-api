import { DataSource } from 'typeorm';
import { Permission } from '@modules/permissions/permission.entity';
import {
  PERMISSIONS,
  generatePermissions,
} from '@core/permissions';
export default class PermissionSeeder {
  public async run(dataSource: DataSource): Promise<void> {
    const permissionRepo = dataSource.getRepository(Permission);

    const permissions = generatePermissions()

    for (const permission of permissions) {
      const exists = await permissionRepo.findOne({
        where: { code: permission.code },
      });

      if (exists) {
        continue;
      }

      await permissionRepo.save(permissionRepo.create(permission));
    }

    console.log(`✔ Seeded ${permissions.length} permissions`);
  }
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}