export enum SportType {
  BASKETBALL = 'BASKETBALL',
  BADMINTON = 'BADMINTON',
  TENNIS = 'TENNIS',
  PICKLEBALL = 'PICKLEBALL',
  VOLLEYBALL = 'VOLLEYBALL',
  FUTSAL = 'FUTSAL',
}

export enum CourtStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  MAINTENANCE = 'MAINTENANCE',
}

export interface ICourt {
  id: string;
  venueId: string;
  name: string;
  sportType: SportType;
  surfaceType?: string;
  indoor: boolean;
  pricePerHour: number;
  status: CourtStatus;
  createdAt: Date;
  updatedAt: Date;
}