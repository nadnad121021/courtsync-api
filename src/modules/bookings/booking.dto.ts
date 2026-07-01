import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';

import { BookingStatus, PaymentMethod, PaymentStatus } from './booking.interface';

export class CreateBookingDto {
  @IsUUID()
  @IsNotEmpty()
  courtId!: string;

  @IsDateString()
  bookingDate!: string;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/)
  startTime!: string;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/)
  endTime!: string;

  @IsEnum(PaymentMethod)
  paymentMethod!: PaymentMethod;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateBookingDto {
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @IsOptional()
  @IsEnum(PaymentStatus)
  paymentStatus?: PaymentStatus;
}