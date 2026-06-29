import { DataSource, In } from 'typeorm';

import { Role } from '@modules/roles/role.entity';
import { Permission } from '@modules/permissions/permission.entity';
import { RoleStatus } from '@modules/roles/role.interface';
import { PERMISSIONS } from '@core/permissions';

export default class RoleSeeder {
  public async run(dataSource: DataSource): Promise<void> {
    const roleRepo = dataSource.getRepository(Role);
    const permissionRepo = dataSource.getRepository(Permission);

    const roles = [
      {
        name: 'SUPER_ADMIN',
        description: 'Full access to the entire platform.',
        isSystemRole: true,
        permissions: ['*'],
      },
      {
        name: 'ADMIN',
        description: 'Platform administrator.',
        isSystemRole: true,
        permissions: [
          PERMISSIONS.USERS_READ,
          PERMISSIONS.USERS_CREATE,
          PERMISSIONS.USERS_UPDATE,

          PERMISSIONS.ROLES_READ,

          PERMISSIONS.PERMISSIONS_READ,

          PERMISSIONS.VENUES_READ,
          PERMISSIONS.VENUES_CREATE,
          PERMISSIONS.VENUES_UPDATE,
          PERMISSIONS.VENUES_DELETE,

          PERMISSIONS.COURTS_READ,
          PERMISSIONS.COURTS_CREATE,
          PERMISSIONS.COURTS_UPDATE,
          PERMISSIONS.COURTS_DELETE,

          PERMISSIONS.BOOKINGS_READ,
          PERMISSIONS.BOOKINGS_UPDATE,

          PERMISSIONS.PAYMENTS_READ,

          PERMISSIONS.NOTIFICATIONS_READ,
        ],
      },
      {
        name: 'VENUE_OWNER',
        description: 'Manage owned venues and courts.',
        isSystemRole: true,
        permissions: [
          PERMISSIONS.VENUES_READ,
          PERMISSIONS.VENUES_CREATE,
          PERMISSIONS.VENUES_UPDATE,

          PERMISSIONS.COURTS_READ,
          PERMISSIONS.COURTS_CREATE,
          PERMISSIONS.COURTS_UPDATE,
          PERMISSIONS.COURTS_DELETE,

          PERMISSIONS.BOOKINGS_READ,
          PERMISSIONS.BOOKINGS_UPDATE,

          PERMISSIONS.PAYMENTS_READ,

          PERMISSIONS.NOTIFICATIONS_READ,
        ],
      },
      {
        name: 'PLAYER',
        description: 'Book courts and manage own bookings.',
        isSystemRole: true,
        permissions: [
          PERMISSIONS.VENUES_READ,
          PERMISSIONS.COURTS_READ,

          PERMISSIONS.BOOKINGS_READ,
          PERMISSIONS.BOOKINGS_CREATE,

          PERMISSIONS.PAYMENTS_CREATE,
          PERMISSIONS.PAYMENTS_READ,

          PERMISSIONS.NOTIFICATIONS_READ,
        ],
      },
    ];

    const allPermissions = await permissionRepo.find();

    for (const roleData of roles) {
      let role = await roleRepo.findOne({
        where: {
          name: roleData.name,
        },
        relations: {
          permissions: true,
        },
      });

      let permissions: Permission[] = [];

      if (roleData.permissions.includes('*')) {
        permissions = allPermissions;
      } else {
        permissions = await permissionRepo.find({
          where: {
            code: In(roleData.permissions),
          },
        });
      }

      if (!role) {
        role = roleRepo.create({
          name: roleData.name,
          description: roleData.description,
          isSystemRole: roleData.isSystemRole,
          status: RoleStatus.ACTIVE,
          permissions,
        });
      } else {
        role.description = roleData.description;
        role.isSystemRole = roleData.isSystemRole;
        role.status = RoleStatus.ACTIVE;
        role.permissions = permissions;
      }

      await roleRepo.save(role);
    }

    console.log(`✔ Seeded ${roles.length} roles`);
  }
}