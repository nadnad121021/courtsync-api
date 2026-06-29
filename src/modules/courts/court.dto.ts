import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { CourtStatus, SportType } from './court.interface';

export class CreateCourtDto {
  @IsUUID()
  @IsNotEmpty()
  venueId!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEnum(SportType)
  sportType!: SportType;

  @IsString()
  @IsOptional()
  surfaceType?: string;

  @IsBoolean()
  @IsOptional()
  indoor?: boolean;

  @IsNumber()
  pricePerHour!: number;
}

export class UpdateCourtDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(SportType)
  @IsOptional()
  sportType?: SportType;

  @IsString()
  @IsOptional()
  surfaceType?: string;

  @IsBoolean()
  @IsOptional()
  indoor?: boolean;

  @IsNumber()
  @IsOptional()
  pricePerHour?: number;

  @IsEnum(CourtStatus)
  @IsOptional()
  status?: CourtStatus;
}