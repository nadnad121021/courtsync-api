import { CourtRepository } from '@modules/courts/court.repository';
import { CourtAvailabilityRepository } from '../courtAvailability.repository';
import { BookingRepository } from '@modules/bookings/booking.repository';
import { UpdateCourtAvailabilityDto } from '../courtAvailability.dto';
import { EffectiveAvailability, TimeSlot } from '../courtAvailability.interface';
import { Booking } from '@modules/bookings/booking.entity';


class CourtAvailabilityService {
  async getCourtAvailability(courtId: string) {
    const court = await CourtRepository.findOne({
      where: { id: courtId },
      relations: {
        availabilities: true,
      },
    });

    if (!court) {
      throw new Error('Court not found');
    }

    if (court.availabilities?.length > 0) {
      return {
        source: 'CUSTOM',
        availability: court.availabilities.sort(
          (a, b) => a.dayOfWeek - b.dayOfWeek,
        ),
      };
    }

    return {
      source: 'DEFAULT_24H',
      availability: Array.from({ length: 7 }).map((_, dayOfWeek) => ({
        dayOfWeek,
        startTime: '00:00:00',
        endTime: '23:59:59',
        isAvailable: true,
      })),
    };
  }

  async updateCourtAvailability(
    courtId: string,
    payload: UpdateCourtAvailabilityDto[],
  ) {
    const court = await CourtRepository.findOne({
      where: { id: courtId },
    });

    if (!court) {
      throw new Error('Court not found');
    }

    for (const item of payload) {
      if (item.dayOfWeek < 0 || item.dayOfWeek > 6) {
        throw new Error('Invalid dayOfWeek. Must be between 0 and 6');
      }

      if (item.startTime >= item.endTime) {
        throw new Error('startTime must be earlier than endTime');
      }
    }

    await CourtAvailabilityRepository.delete({ courtId });

    const availabilities = payload.map(item =>
      CourtAvailabilityRepository.create({
        courtId,
        dayOfWeek: item.dayOfWeek,
        startTime: item.startTime,
        endTime: item.endTime,
        isAvailable: item.isAvailable,
      }),
    );

    return CourtAvailabilityRepository.save(availabilities);
  }

  async resetCourtAvailability(courtId: string) {
    const court = await CourtRepository.findOne({
      where: { id: courtId },
    });

    if (!court) {
      throw new Error('Court not found');
    }

    await CourtAvailabilityRepository.delete({ courtId });

    return {
      message: 'Court availability reset to venue default hours',
    };
  }

  async getAvailableSlots(courtId: string, date: string) {
    await this.ensureCourtExists(courtId);

    const dayOfWeek = new Date(date).getDay();

    const { source, availability } = await this.getEffectiveAvailability(
      courtId,
      dayOfWeek,
    );

    if (!availability.isAvailable) {
      return {
        courtId,
        date,
        source,
        availability,
        bookings: [],
        availableSlots: [],
      };
    }

    const bookings = await this.getBookingsByCourtAndDate(courtId, date);

    const availableSlots = this.calculateAvailableSlots(
      availability,
      bookings,
    );

    return {
      courtId,
      date,
      source,
      availability,
      bookings,
      availableSlots,
    };
  }

  private async ensureCourtExists(courtId: string) {
    const court = await CourtRepository.findOne({
      where: { id: courtId },
    });

    if (!court) {
      throw new Error('Court not found');
    }

    return court;
  }

  private async getEffectiveAvailability(
    courtId: string,
    dayOfWeek: number,
  ): Promise<EffectiveAvailability> {
    const customAvailability = await CourtAvailabilityRepository.findOne({
      where: {
        courtId,
        dayOfWeek,
      },
    });

    if (customAvailability) {
      return {
        source: 'CUSTOM',
        availability: {
          dayOfWeek: customAvailability.dayOfWeek,
          startTime: customAvailability.startTime,
          endTime: customAvailability.endTime,
          isAvailable: customAvailability.isAvailable,
        },
      };
    }

    return {
      source: 'DEFAULT_24H',
      availability: {
        dayOfWeek,
        startTime: '00:00:00',
        endTime: '23:59:59',
        isAvailable: true,
      },
    };
  }

  private async getBookingsByCourtAndDate(courtId: string, date: string) {
    return BookingRepository.createQueryBuilder('booking')
      .where('booking.courtId = :courtId', { courtId })
      .andWhere('booking.bookingDate = :date', { date })
      .andWhere('booking.status IN (:...statuses)', {
        statuses: ['PENDING', 'CONFIRMED'],
      })
      .orderBy('booking.startTime', 'ASC')
      .getMany();
  }

  private calculateAvailableSlots(
    availability: EffectiveAvailability['availability'],
    bookings: Booking[],
  ): TimeSlot[] {
    let availableSlots: TimeSlot[] = [
      {
        startTime: availability.startTime,
        endTime: availability.endTime,
      },
    ];

    for (const booking of bookings) {
      const bookingStart = this.toMinutes(booking.startTime);
      const bookingEnd = this.toMinutes(booking.endTime);

      availableSlots = availableSlots.flatMap((slot) => {
        const slotStart = this.toMinutes(slot.startTime);
        const slotEnd = this.toMinutes(slot.endTime);

        if (bookingEnd <= slotStart || bookingStart >= slotEnd) {
          return [slot];
        }

        const result: TimeSlot[] = [];

        if (bookingStart > slotStart) {
          result.push({
            startTime: this.toTime(slotStart),
            endTime: this.toTime(bookingStart),
          });
        }

        if (bookingEnd < slotEnd) {
          result.push({
            startTime: this.toTime(bookingEnd),
            endTime: this.toTime(slotEnd),
          });
        }

        return result;
      });
    }

    return availableSlots;
  }

  private toMinutes(time: string) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  private toTime(minutes: number) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;

    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00`;
  }

}

export default new CourtAvailabilityService();