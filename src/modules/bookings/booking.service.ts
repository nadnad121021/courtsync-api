import { BookingRepository } from './booking.repository';
import { CreateBookingDto, UpdateBookingDto } from './booking.dto';
import { formatDuration, generateBookingCode, toMinutes } from '@core/utils/common.util';
import { CourtRepository } from '@modules/courts/court.repository';
import { BookingStatus, IGetBookingsFilterQuery, PaymentMethod, PaymentStatus } from './booking.interface';
import { AppDataSource } from '@db';

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

  async findByUserId(id: string) {
    return BookingRepository.find({
      where: { userId: id },
    });
  }

  async create(payload: CreateBookingDto, userId: string) {
    const startMinutes = toMinutes(payload.startTime);
    const endMinutes = toMinutes(payload.endTime);

    if (endMinutes <= startMinutes) {
      throw new Error('End time must be later than start time');
    }

    const durationHours = (endMinutes - startMinutes) / 60;

    const court = await CourtRepository.findOne({
      where: { id: payload.courtId },
    });

    if (!court) {
      throw new Error('Court not found');
    }

    const conflict = await BookingRepository.createQueryBuilder('booking')
      .where('booking.courtId = :courtId', { courtId: payload.courtId })
      .andWhere('booking.bookingDate = :bookingDate', {
        bookingDate: payload.bookingDate,
      })
      .andWhere('booking.status IN (:...statuses)', {
        statuses: ['PENDING', 'CONFIRMED'],
      })
      .andWhere(
        `
      booking.startTime < :endTime
      AND booking.endTime > :startTime
      `,
        {
          startTime: payload.startTime,
          endTime: payload.endTime,
        },
      )
      .getOne();

    if (conflict) {
      throw new Error('This time slot is already booked');
    }

    const totalAmount = Number(court.pricePerHour) * durationHours;

    const booking = BookingRepository.create({
      courtId: payload.courtId,
      userId,
      bookingDate: payload.bookingDate,
      startTime: payload.startTime,
      endTime: payload.endTime,
      totalAmount,
      paymentMethod: payload.paymentMethod,
      notes: payload.notes,
      status: payload.paymentMethod === 'CASH' ? BookingStatus.CONFIRMED : BookingStatus.PENDING,
      paymentStatus: payload.paymentMethod === 'CASH' ? PaymentStatus.PENDING : PaymentStatus.UNPAID,
      bookingCode: generateBookingCode(),
    });

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

  async getBookingsByFilter(params: IGetBookingsFilterQuery) {
    const {
      skip = 0,
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
      searchKey,
      status = 'ALL',
      ownerId,
      sportType = 'ALL',
      bookingDate,
    } = params;

    const isPostgres = AppDataSource.options.type === 'postgres';
    const operator = isPostgres ? 'ILIKE' : 'LIKE';

    const allowedSortFields = [
      'createdAt',
      'bookingDate',
      'startTime',
      'endTime',
      'totalAmount',
      'status',
      'paymentStatus',
    ];

    const orderBy = allowedSortFields.includes(sortBy)
      ? sortBy
      : 'createdAt';

    const baseQb = BookingRepository.createQueryBuilder('booking')
      .leftJoinAndSelect('booking.court', 'court')
      .leftJoinAndSelect('court.venue', 'venue');

    if (ownerId) {
      baseQb.andWhere('booking.userId = :ownerId', { ownerId });
    }

    if (searchKey) {
      baseQb.andWhere(
        `(
        booking.bookingCode ${operator} :search OR
        court.name ${operator} :search OR
        court.sportType ${operator} :search OR
        venue.name ${operator} :search
      )`,
        { search: `%${searchKey}%` },
      );
    }

    if (status !== 'ALL') {
      baseQb.andWhere('booking.status = :status', { status });
    }

    if (sportType !== 'ALL') {
      baseQb.andWhere('court.sportType = :sportType', { sportType });
    }

    if (bookingDate) {
      baseQb.andWhere('booking.bookingDate = :bookingDate', { bookingDate });
    }

    const total = await baseQb.clone().getCount();

    const bookings = await baseQb
      .clone()
      .orderBy(`booking.${orderBy}`, sortOrder === 'ASC' ? 'ASC' : 'DESC')
      .skip(skip)
      .take(limit)
      .getMany();

    return {
      data: bookings.map((booking) => {
        return {
          ...booking,
          venueName: booking.court?.venue?.name,
          courtName: booking.court?.name,
          sportType: booking.court?.sportType,
          duration: formatDuration(
            booking.startTime,
            booking.endTime,
          ),
        };
      }),
      meta: {
        total,
        skip,
        limit: limit > 0 ? limit : total,
      },
    };
  }
}

export default new BookingService();