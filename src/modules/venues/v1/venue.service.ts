import { VenueRepository } from '../venue.repository';
import { CreateVenueDto, UpdateVenueDto } from '../venue.dto';
import { IGetVenuesFilterQuery } from '../venue.interface';
import { AppDataSource } from '@db';
import { Booking } from '@modules/bookings/booking.entity';

class VenueService {
  async findAll() {
    return VenueRepository.find();
  }

  async findById(id: string) {
    return VenueRepository.findOne({
      where: { id },
    });
  }

  async findByIdWithMetadata(id: string) {
    const venue = await VenueRepository
      .createQueryBuilder('venue')
      .leftJoinAndSelect('venue.courts', 'court')
      .leftJoinAndMapMany(
        'court.recentBookings',
        Booking,
        'booking',
        'booking.courtId = court.id',
      )
      .where('venue.id = :id', { id })
      .orderBy('court.createdAt', 'DESC')
      .addOrderBy('booking.createdAt', 'DESC')
      .getOne();

    return venue;
  }

  async findByUserId(id: string) {
    return VenueRepository.find({
      where: { ownerId: id },
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

  async getAllActiveVenuesByFilter(params: IGetVenuesFilterQuery) {
    const {
      skip = 0,
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
      searchKey,
      ownerId,
    } = params;

    const isPostgres = AppDataSource.options.type === 'postgres';
    const operator = isPostgres ? 'ILIKE' : 'LIKE';

    const allowedSortFields = [
      'createdAt',
      'name',
      'address',
      'city',
      'province',
    ];

    const orderBy = allowedSortFields.includes(sortBy)
      ? sortBy
      : 'createdAt';

    const baseQb = VenueRepository.createQueryBuilder('venue');
    baseQb.andWhere('venue.status = :status', { status:'ACTIVE' });

    if (ownerId) {
      baseQb.andWhere('venue.ownerId = :ownerId', { ownerId });
    }

    if (searchKey) {
      baseQb.andWhere(
        `(
        venue.name ${operator} :search OR
        venue.address ${operator} :search OR
        venue.city ${operator} :search OR
        venue.province ${operator} :search
      )`,
        { search: `%${searchKey}%` },
      );
    }

    const listQb = baseQb.clone();

    listQb
      .leftJoin('venue.courts', 'court')
      .leftJoin(Booking, 'booking', 'booking.courtId = court.id')
      .addSelect('COUNT(DISTINCT court.id)', 'courtsCount')
      .addSelect(
        `
      COUNT(
        DISTINCT CASE
          WHEN DATE(booking.bookingDate) = CURRENT_DATE
          THEN booking.id
        END
      )
      `,
        'numberOfBookingsToday',
      )
      .groupBy('venue.id')
      .orderBy(`venue.${orderBy}`, sortOrder === 'ASC' ? 'ASC' : 'DESC');

    if (limit > 0) {
      listQb.skip(skip).take(limit);
    }

    const { entities, raw } = await listQb.getRawAndEntities();

    const venues = entities.map((venue, index) => ({
      ...venue,
      courtsCount: Number(raw[index]?.courtsCount || 0),
      numberOfBookingsToday: Number(raw[index]?.numberOfBookingsToday || 0),
    }));

    const total = await baseQb.clone().getCount();

    const stats = await baseQb
      .clone()
      .leftJoin('venue.courts', 'court')
      .select([
        `COUNT(DISTINCT CASE WHEN venue.status = 'ACTIVE' THEN venue.id END) AS active`,
        `COUNT(DISTINCT CASE WHEN venue.status = 'PENDING' THEN venue.id END) AS pending`,
        `COUNT(DISTINCT court.id) AS totalCourts`,
      ])
      .getRawOne();

    return {
      data: venues,
      meta: {
        total,
        activeCount: Number(stats?.active || 0),
        pendingCount: Number(stats?.pending || 0),
        totalCourtsCount: Number(stats?.totalCourts || 0),
        skip,
        limit: limit > 0 ? limit : total,
      },
    };
  }

  async getVenuesByFilter(params: IGetVenuesFilterQuery) {
    const {
      skip = 0,
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
      searchKey,
      status = 'ALL',
      ownerId,
    } = params;

    const isPostgres = AppDataSource.options.type === 'postgres';
    const operator = isPostgres ? 'ILIKE' : 'LIKE';

    const allowedSortFields = [
      'createdAt',
      'name',
      'address',
      'city',
      'province',
    ];

    const orderBy = allowedSortFields.includes(sortBy)
      ? sortBy
      : 'createdAt';

    const baseQb = VenueRepository.createQueryBuilder('venue');

    if (ownerId) {
      baseQb.andWhere('venue.ownerId = :ownerId', { ownerId });
    }

    if (searchKey) {
      baseQb.andWhere(
        `(
        venue.name ${operator} :search OR
        venue.address ${operator} :search OR
        venue.city ${operator} :search OR
        venue.province ${operator} :search
      )`,
        { search: `%${searchKey}%` },
      );
    }

    const listQb = baseQb.clone();

    if (status !== 'ALL') {
      listQb.andWhere('venue.status = :status', { status });
    }

    listQb
      .leftJoin('venue.courts', 'court')
      .leftJoin(Booking, 'booking', 'booking.courtId = court.id')
      .addSelect('COUNT(DISTINCT court.id)', 'courtsCount')
      .addSelect(
        `
      COUNT(
        DISTINCT CASE
          WHEN DATE(booking.bookingDate) = CURRENT_DATE
          THEN booking.id
        END
      )
      `,
        'numberOfBookingsToday',
      )
      .groupBy('venue.id')
      .orderBy(`venue.${orderBy}`, sortOrder === 'ASC' ? 'ASC' : 'DESC');

    if (limit > 0) {
      listQb.skip(skip).take(limit);
    }

    const { entities, raw } = await listQb.getRawAndEntities();

    const venues = entities.map((venue, index) => ({
      ...venue,
      courtsCount: Number(raw[index]?.courtsCount || 0),
      numberOfBookingsToday: Number(raw[index]?.numberOfBookingsToday || 0),
    }));

    const total = await baseQb.clone().getCount();

    const stats = await baseQb
      .clone()
      .leftJoin('venue.courts', 'court')
      .select([
        `COUNT(DISTINCT CASE WHEN venue.status = 'ACTIVE' THEN venue.id END) AS active`,
        `COUNT(DISTINCT CASE WHEN venue.status = 'PENDING' THEN venue.id END) AS pending`,
        `COUNT(DISTINCT court.id) AS totalCourts`,
      ])
      .getRawOne();

    return {
      data: venues,
      meta: {
        total,
        activeCount: Number(stats?.active || 0),
        pendingCount: Number(stats?.pending || 0),
        totalCourtsCount: Number(stats?.totalCourts || 0),
        skip,
        limit: limit > 0 ? limit : total,
      },
    };
  }
}

export default new VenueService();
