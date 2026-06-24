import { BookingRepository } from './booking.repository';
import { CreateBookingDto, UpdateBookingDto } from './booking.dto';

class BookingService {
  async findAll() {
    return BookingRepository.find();
  }

  async findById(id: string) {
    return BookingRepository.findOne({
      where: { id },
    });
  }

  async create(payload: CreateBookingDto) {
    const data = BookingRepository.create(payload);

    return BookingRepository.save(data);
  }

  async update(id: string, payload: UpdateBookingDto) {
    await BookingRepository.update(id, payload);

    return this.findById(id);
  }

  async delete(id: string) {
    await BookingRepository.delete(id);

    return true;
  }
}

export default new BookingService();
