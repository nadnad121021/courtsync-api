import { AppDataSource } from '@db';
import { User } from '@modules/users/user.entity';

export class UserRepository {
  private repo = AppDataSource.getRepository(User);

  findAllIncludingDeleted() {
    return this.repo.find({ });
  }

  findActiveUsers() {
    return this.repo.find({ where: { isActive: true, isDeleted: false } });
  }

  findById(id: string) {
    return this.repo.findOne({
      where: { id ,isActive: true , isDeleted: false, isVerified: true },
      relations: {
        roles: {
          permissions: true,
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        isActive: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
        isDeleted: true,
        deletedAt: true,
        deletedBy: true,
        password: false, // Exclude password from selection
        roles: {
          id: true,
          name: true,
          description: true,

          permissions: {
            id: true,
            code: true,
            description: true,
          },
        },
  },
    });
  }

  findByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }

  create(data: Partial<User>) {
    const user = this.repo.create(data as User);
    return this.repo.save(user);
  }

  update(id: string, data: Partial<User>) {
    return this.repo.update({ id }, data);
  }

  delete(id: string) {
    return this.repo.delete({ id });
  }

  findAll(filter: Partial<User>) {
    return this.repo.find({ where: filter });
  }

  createQueryBuilder(alias: string) {
    return this.repo.createQueryBuilder(alias);
  }
}
