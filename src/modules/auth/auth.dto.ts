import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, IsBoolean,IsEnum } from "class-validator";

export enum RegisterAccountType {
  PLAYER = 'PLAYER',
  VENUE_OWNER = 'VENUE_OWNER',
}
export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEnum(RegisterAccountType)
  accountType!: RegisterAccountType;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsString()
  confirmPassword!: string;

  @IsBoolean()
  @IsOptional()
  acceptedTerms?: boolean;
}

export class LoginDto {
  @IsEmail({}, { message: "Email is invalid" })
  email!: string;

  @IsNotEmpty({ message: "Password is required" })
  password!: string;
}
