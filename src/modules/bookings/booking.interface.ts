export interface IBooking {
  id: string;
  bookingCode: string;
  playerId: string;
  courtId: string;
  scheduleDate: string;
  startTime: string;
  endTime: string;
  totalAmount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
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

export type PaymentMethod = 'CASH' | 'GCASH' | 'CARD' | 'BANK_TRANSFER';