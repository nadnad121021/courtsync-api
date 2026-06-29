import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Matches,
} from 'class-validator';

import { BookingStatus, PaymentStatus } from './booking.interface';

export class CreateBookingDto {
  @IsUUID()
  @IsNotEmpty()
  userId!: string;

  @IsUUID()
  @IsNotEmpty()
  courtId!: string;

  @IsDateString()
  bookingDate!: string;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  startTime!: string;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  endTime!: string;

  @IsNumber()
  totalAmount!: number;
}

export class UpdateBookingDto {
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @IsOptional()
  @IsEnum(PaymentStatus)
  paymentStatus?: PaymentStatus;
}