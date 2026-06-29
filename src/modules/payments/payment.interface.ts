export enum PaymentMethod {
  CASH = 'CASH',
  GCASH = 'GCASH',
  CARD = 'CARD',
  BANK_TRANSFER = 'BANK_TRANSFER',
}

export enum PaymentProvider {
  MANUAL = 'MANUAL',
  PAYMONGO = 'PAYMONGO',
  STRIPE = 'STRIPE',
  MAYA = 'MAYA',
  GCASH = 'GCASH',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

export interface IPayment {
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  provider: PaymentProvider;
  status: PaymentStatus;
  providerReferenceId?: string;
  paidAt?: Date;
  failedReason?: string;
  createdAt: Date;
  updatedAt: Date;
}