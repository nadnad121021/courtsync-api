import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { RoleStatus } from './role.interface';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isSystemRole?: boolean;

  @IsArray()
  @IsOptional()
  permissions?: string[];
}

export class UpdateRoleDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isSystemRole?: boolean;

  @IsEnum(RoleStatus)
  @IsOptional()
  status?: RoleStatus;

  @IsArray()
  @IsOptional()
  permissions?: string[];
}