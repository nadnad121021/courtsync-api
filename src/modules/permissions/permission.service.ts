import { PermissionRepository } from './permission.repository';
import { CreatePermissionDto, UpdatePermissionDto } from './permission.dto';

class PermissionService {
  async findAll() {
    return PermissionRepository.find();
  }

  async findById(id: string) {
    return PermissionRepository.findOne({
      where: { id },
    });
  }

  async create(payload: CreatePermissionDto) {
    const data = PermissionRepository.create(payload);

    return PermissionRepository.save(data);
  }

  async update(id: string, payload: UpdatePermissionDto) {
    await PermissionRepository.update(id, payload);

    return this.findById(id);
  }

  async delete(id: string) {
    await PermissionRepository.delete(id);

    return true;
  }
}

export default new PermissionService();
