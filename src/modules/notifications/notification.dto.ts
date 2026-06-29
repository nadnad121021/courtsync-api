import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import {
  NotificationChannel,
  NotificationStatus,
  NotificationType,
} from './notification.interface';

export class CreateNotificationDto {
  @IsUUID()
  @IsNotEmpty()
  userId!: string;

  @IsEnum(NotificationType)
  type!: NotificationType;

  @IsEnum(NotificationChannel)
  channel!: NotificationChannel;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  message!: string;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, unknown>;
}

export class UpdateNotificationDto {
  @IsEnum(NotificationStatus)
  @IsOptional()
  status?: NotificationStatus;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, unknown>;
}