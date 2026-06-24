import { VenueRepository } from '../venue.repository';
import { CreateVenueDto, UpdateVenueDto } from '../venue.dto';

class VenueService {
  async findAll() {
    return VenueRepository.find();
  }

  async findById(id: string) {
    return VenueRepository.findOne({
      where: { id },
    });
  }

  async create(payload: CreateVenueDto) {
    const data = VenueRepository.create(payload as any);

    return VenueRepository.save(data);
  }

  async update(id: string, payload: UpdateVenueDto) {
    await VenueRepository.update(id, payload as any);

    return this.findById(id);
  }

  async delete(id: string) {
    await VenueRepository.delete(id);

    return true;
  }
}

export default new VenueService();
