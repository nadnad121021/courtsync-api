import { CourtRepository } from './court.repository';
import { CreateCourtDto, UpdateCourtDto } from './court.dto';

class CourtService {
  async findAll() {
    return CourtRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findById(id: string) {
    return CourtRepository.findOne({
      where: { id },
    });
  }

  async findByVenueId(venueId: string) {
    return CourtRepository.find({
      where: { venueId },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async create(payload: CreateCourtDto) {
    const court = CourtRepository.create(payload);

    return CourtRepository.save(court);
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