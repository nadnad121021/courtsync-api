import { CourtRepository } from '../court.repository';
import { CreateCourtDto, UpdateCourtDto } from '../court.dto';
import { AppDataSource } from '@db';
import { IGetCourtsFilterQuery } from '../court.interface';

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

  async getCourtsByFilter(params: IGetCourtsFilterQuery) {
    const {
      skip = 0,
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
      searchKey,
      status = 'ALL',
      ownerId,
      sportType,
    } = params;

    const isPostgres = AppDataSource.options.type === 'postgres';
    const operator = isPostgres ? 'ILIKE' : 'LIKE';

    const allowedSortFields = ['createdAt', 'name', 'surfaceType', 'sportType'];
    const orderBy = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';

    const baseQb = CourtRepository.createQueryBuilder('court')
      .leftJoin('court.venue', 'venue');

    if (ownerId) {
      baseQb.andWhere('venue.ownerId = :ownerId', { ownerId });
    }

    if (searchKey) {
      baseQb.andWhere(
        `(
        court.name ${operator} :search OR
        court.surfaceType ${operator} :search OR
        venue.name ${operator} :search
      )`,
        { search: `%${searchKey}%` },
      );
    }

    const listQb = baseQb.clone();

    if (status !== 'ALL') {
      listQb.andWhere('court.status = :status', { status });
    }

    if (sportType && sportType !== 'ALL') {
      listQb.andWhere('court.sportType = :sportType', { sportType });
    }

    listQb
      .addSelect('venue.name', 'venueName')
      .orderBy(`court.${orderBy}`, sortOrder === 'ASC' ? 'ASC' : 'DESC');

    if (limit > 0) {
      listQb.skip(skip).take(limit);
    }

    const { entities, raw } = await listQb.getRawAndEntities();

    const courts = entities.map((court, index) => ({
      ...court,
      venueName: raw[index].venueName,
    }));

    const total = await listQb.getCount();

    const stats = await baseQb
      .clone()
      .select([
        `COUNT(DISTINCT CASE WHEN court.status = 'ACTIVE' THEN court.id END) AS active`,
        `COUNT(DISTINCT CASE WHEN court.status = 'MAINTENANCE' THEN court.id END) AS maintenance`,
      ])
      .getRawOne();

    return {
      data: courts,
      meta: {
        total,
        activeCount: Number(stats?.active || 0),
        maintenanceCount: Number(stats?.maintenance || 0),
        skip,
        limit: limit > 0 ? limit : total,
      },
    };
  }

  async getEffectiveCourtAvailability(courtId: string) {
    const court = await CourtRepository.findOne({
      where: { id: courtId },
      relations: {
        venue: true,
        availabilities: true,
      },
    });

    if (!court) {
      throw new Error('Court not found');
    }

    if (court.availabilities?.length > 0) {
      return {
        source: 'CUSTOM',
        availability: court.availabilities,
      };
    }

    return {
      source: 'VENUE_DEFAULT',
      availability: Array.from({ length: 7 }).map((_, dayOfWeek) => ({
        dayOfWeek,
        startTime: court.venue.openingTime,
        endTime: court.venue.closingTime,
        isAvailable: true,
      })),
    };
  }
}

export default new CourtService();