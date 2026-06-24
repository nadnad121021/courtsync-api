import { CourtRepository } from './court.repository';
import { CreateCourtDto, UpdateCourtDto } from './court.dto';

class CourtService {
  async findAll() {
    return CourtRepository.find();
  }

  async findById(id: string) {
    return CourtRepository.findOne({
      where: { id },
    });
  }

  async create(payload: CreateCourtDto) {
    const data = CourtRepository.create(payload);

    return CourtRepository.save(data);
  }

  async update(id: string, payload: UpdateCourtDto) {
    await CourtRepository.update(id, payload);

    return this.findById(id);
  }

  async delete(id: string) {
    await CourtRepository.delete(id);

    return true;
  }
}

export default new CourtService();
