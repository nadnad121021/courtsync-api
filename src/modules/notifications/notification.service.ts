import { CreateNotificationDto, UpdateNotificationDto } from './notification.dto';
import { NotificationRepository } from './notification.repository';
import { NotificationStatus } from './notification.interface';

class NotificationService {
  async findAll() {
    return NotificationRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findById(id: string) {
    return NotificationRepository.findOne({
      where: { id },
    });
  }

  async findByUserId(userId: string) {
    return NotificationRepository.find({
      where: { userId },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async create(payload: CreateNotificationDto) {
    const notification = NotificationRepository.create(payload);

    return NotificationRepository.save(notification);
  }

  async update(id: string, payload: UpdateNotificationDto) {
    await NotificationRepository.update(id, payload as any);

    return this.findById(id);
  }

  async markAsSent(id: string) {
    await NotificationRepository.update(id, {
      status: NotificationStatus.SENT,
      sentAt: new Date(),
    });

    return this.findById(id);
  }

  async markAsRead(id: string) {
    await NotificationRepository.update(id, {
      status: NotificationStatus.READ,
      readAt: new Date(),
    });

    return this.findById(id);
  }

  async markAsFailed(id: string) {
    await NotificationRepository.update(id, {
      status: NotificationStatus.FAILED,
    });

    return this.findById(id);
  }

  async delete(id: string) {
    await NotificationRepository.delete(id);

    return true;
  }
}

export default new NotificationService();