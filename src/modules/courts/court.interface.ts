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

export type SportType =
  | 'BASKETBALL'
  | 'BADMINTON'
  | 'TENNIS'
  | 'PICKLEBALL'
  | 'VOLLEYBALL'
  | 'FUTSAL';

export type CourtStatus = 'AVAILABLE' | 'UNAVAILABLE' | 'MAINTENANCE';

export interface ICreateCourt {
  venueId: string;
  name: string;
  sportType: SportType;
  surfaceType?: string;
  indoor?: boolean;
  pricePerHour: number;
}

export interface IUpdateCourt extends Partial<ICreateCourt> {
  status?: CourtStatus;
}