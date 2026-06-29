import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import {
  PaymentMethod,
  PaymentProvider,
  PaymentStatus,
} from './payment.interface';

export class CreatePaymentDto {
  @IsUUID()
  @IsNotEmpty()
  bookingId!: string;

  @IsUUID()
  @IsNotEmpty()
  userId!: string;

  @IsNumber()
  amount!: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsEnum(PaymentMethod)
  method!: PaymentMethod;

  @IsEnum(PaymentProvider)
  @IsOptional()
  provider?: PaymentProvider;
}

export class UpdatePaymentDto {
  @IsEnum(PaymentStatus)
  @IsOptional()
  status?: PaymentStatus;

  @IsString()
  @IsOptional()
  providerReferenceId?: string;

  @IsString()
  @IsOptional()
  failedReason?: string;
}