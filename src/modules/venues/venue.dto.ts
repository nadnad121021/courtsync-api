import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsLatitude,
  IsLongitude,
  IsPhoneNumber,
  IsMilitaryTime,
} from 'class-validator';

export class CreateVenueDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsString()
  @IsOptional()
  province?: string;

  @IsLatitude()
  @IsOptional()
  latitude?: number;

  @IsLongitude()
  @IsOptional()
  longitude?: number;

  @IsOptional()
  @IsPhoneNumber()
  contactNumber?: string;

  @IsMilitaryTime()
  openingTime!: string;

  @IsMilitaryTime()
  closingTime!: string;
}

export class UpdateVenueDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  province?: string;

  @IsLatitude()
  @IsOptional()
  latitude?: number;

  @IsLongitude()
  @IsOptional()
  longitude?: number;

  @IsOptional()
  @IsPhoneNumber()
  contactNumber?: string;

  @IsMilitaryTime()
  @IsOptional()
  openingTime?: string;

  @IsMilitaryTime()
  @IsOptional()
  closingTime?: string;
}