import { CreateRoleDto, UpdateRoleDto } from './role.dto';
import { RoleRepository } from './role.repository';

class RoleService {
  async findAll() {
    return RoleRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findById(id: string) {
    return RoleRepository.findOne({
      where: { id },
    });
  }

  async findByName(name: string) {
    return RoleRepository.findOne({
      where: { name },
    });
  }

  async create(payload: CreateRoleDto) {
    const role = RoleRepository.create({
      ...payload as any,
      isSystemRole: payload.isSystemRole ?? false,
    });

    return RoleRepository.save(role);
  }

  async update(id: string, payload: UpdateRoleDto) {
    await RoleRepository.update(id, payload as any);

    return this.findById(id);
  }

  async delete(id: string) {
    await RoleRepository.delete(id);

    return true;
  }
}

export default new RoleService();