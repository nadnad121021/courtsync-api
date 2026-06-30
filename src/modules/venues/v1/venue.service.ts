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

  async findByUserId(id: string) {
    return VenueRepository.find({
      where: { ownerId:id },
    });
  }

  async create(payload: CreateVenueDto, userId: string) {
    const data = VenueRepository.create({
      ...(payload as any),
      ownerId: userId
    });

    return VenueRepository.save(data);
  }

  async update(id: string, payload: UpdateVenueDto, userId: string) {
    await VenueRepository.update(id, {
      ...(payload as any)
    });

    return this.findById(id);
  }

  async delete(id: string) {
    await VenueRepository.delete(id);

    return true;
  }
}

export default new VenueService();
