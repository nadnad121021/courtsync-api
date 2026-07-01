import { IQuery } from "@core/interfaces/common.interface";

export interface IBooking {
  id: string;
  bookingCode?: string;
  userId: string;
  courtId: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  totalAmount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

export enum PaymentStatus {
  UNPAID = 'UNPAID',
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export interface ICreateBooking {
  playerId: string;
  courtId: string;
  scheduleDate: string;
  startTime: string;
  endTime: string;
  paymentMethod: PaymentMethod;
}

export interface ICancelBooking {
  bookingId: string;
  cancelledBy: string;
  reason?: string;
}

export enum PaymentMethod {
  CASH = 'CASH',
  ONLINE = 'ONLINE',
}

export interface IGetBookingsFilterQuery extends IQuery {
    searchKey?: string;
    status?: BookingStatus | 'ALL';
    ownerId?: string;
    bookingDate?: string;
    sportType?: string | 'ALL';
}