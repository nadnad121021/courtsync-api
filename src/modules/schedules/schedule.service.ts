import { ScheduleRepository } from './schedule.repository';
import { CreateScheduleDto, UpdateScheduleDto } from './schedule.dto';

class ScheduleService {
  async findAll() {
    return ScheduleRepository.find();
  }

  async findById(id: string) {
    return ScheduleRepository.findOne({
      where: { id },
    });
  }

  async create(payload: CreateScheduleDto) {
    const data = ScheduleRepository.create(payload);

    return ScheduleRepository.save(data);
  }

  async update(id: string, payload: UpdateScheduleDto) {
    await ScheduleRepository.update(id, payload);

    return this.findById(id);
  }

  async delete(id: string) {
    await ScheduleRepository.delete(id);

    return true;
  }
}

export default new ScheduleService();
