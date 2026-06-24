export interface IPayment {
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentTransactionStatus;
  provider?: PaymentProvider;
  providerReferenceId?: string;
  paidAt?: Date;
  failedReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PaymentMethod = 'CASH' | 'GCASH' | 'CARD' | 'BANK_TRANSFER';

export type PaymentProvider =
  | 'MANUAL'
  | 'PAYMONGO'
  | 'STRIPE'
  | 'MAYA'
  | 'GCASH';

export type PaymentTransactionStatus =
  | 'PENDING'
  | 'PAID'
  | 'FAILED'
  | 'CANCELLED'
  | 'REFUNDED';

export interface ICreatePayment {
  bookingId: string;
  userId: string;
  amount: number;
  currency?: string;
  method: PaymentMethod;
  provider?: PaymentProvider;
}

export interface IPaymentWebhookPayload {
  provider: PaymentProvider;
  providerReferenceId: string;
  status: PaymentTransactionStatus;
  rawPayload: unknown;
}