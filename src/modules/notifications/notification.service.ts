import { NotificationRepository } from './notification.repository';
import { CreateNotificationDto, UpdateNotificationDto } from './notification.dto';

class NotificationService {
  async findAll() {
    return NotificationRepository.find();
  }

  async findById(id: string) {
    return NotificationRepository.findOne({
      where: { id },
    });
  }

  async create(payload: CreateNotificationDto) {
    const data = NotificationRepository.create(payload);

    return NotificationRepository.save(data);
  }

  async update(id: string, payload: UpdateNotificationDto) {
    await NotificationRepository.update(id, payload);

    return this.findById(id);
  }

  async delete(id: string) {
    await NotificationRepository.delete(id);

    return true;
  }
}

export default new NotificationService();
