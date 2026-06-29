import { BookingRepository } from './booking.repository';
import { CreateBookingDto, UpdateBookingDto } from './booking.dto';

class BookingService {
  async findAll() {
    return BookingRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findById(id: string) {
    return BookingRepository.findOne({
      where: { id },
    });
  }

  async create(payload: CreateBookingDto) {
    const booking = BookingRepository.create(payload as any);

    return BookingRepository.save(booking);
  }

  async update(id: string, payload: UpdateBookingDto) {
    await BookingRepository.update(id, payload as any);

    return this.findById(id);
  }

  async delete(id: string) {
    await BookingRepository.delete(id);

    return true;
  }
}

export default new BookingService();