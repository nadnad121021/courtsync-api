import bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';

import { User } from '@modules/users/user.entity';
import { Role } from '@modules/roles/role.entity';

export default class SuperAdminSeeder {
  public async run(dataSource: DataSource): Promise<void> {
    const userRepo = dataSource.getRepository(User);
    const roleRepo = dataSource.getRepository(Role);

    const email = 'alingasadan@gmail.com';

    const superAdminRole = await roleRepo.findOne({
      where: {
        name: 'SUPER_ADMIN',
      },
    });

    if (!superAdminRole) {
      throw new Error(
        'SUPER_ADMIN role not found. Please run RoleSeeder first.',
      );
    }

    let superAdmin = await userRepo.findOne({
      where: {
        email,
      },
      relations: {
        roles: true,
      },
    });

    const hashedPassword = await bcrypt.hash('Admin@123456', 10);

    if (!superAdmin) {
      superAdmin = userRepo.create({
        firstName: 'Super',
        lastName: 'Admin',
        email,
        password: hashedPassword,
        isVerified: true,
        roles: [superAdminRole],
      });

      await userRepo.save(superAdmin);

      console.log('✔ Super Admin created');
    } else {
      superAdmin.roles = [superAdminRole];
      await userRepo.save(superAdmin);

      console.log('✔ Super Admin already exists, role synchronized');
    }

    console.log('------------------------------------------');
    console.log('Super Admin Credentials');
    console.log(`Email    : ${email}`);
    console.log('Password : Admin@123456');
    console.log('------------------------------------------');
  }
}