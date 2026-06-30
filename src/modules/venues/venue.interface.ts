export interface IVenue {
  id: string;
  ownerId: string;
  name: string;
  description?: string;
  address: string;
  city: string;
  province?: string;
  latitude?: string;
  longitude?: string;
  contactNumber?: string;
  openingTime: string;
  closingTime: string;
  status: VenueStatus;
  createdAt: Date;
  updatedAt: Date;
}


export enum VenueStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED'
}

export interface ICreateVenue {
  name: string;
  description?: string;
  address: string;
  city: string;
  province?: string;
  latitude?: number;
  longitude?: number;
  contactNumber?: string;
  openingTime: string;
  closingTime: string;
}

export interface IUpdateVenue extends Partial<ICreateVenue> {
  status?: VenueStatus;
}