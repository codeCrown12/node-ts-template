import { IsDateString, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';
import { IsPhoneNumber } from '../validations';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsNumber()
  @IsOptional()
  longitude?: number;

  @IsNumber()
  @IsOptional()
  latitude?: number;

  @IsString()
  @IsOptional()
  photo?: string;

  @IsDateString()
  @IsOptional()
  dateOfBirth?: string;

  @IsString()
  @IsOptional()
  bio?: string;
}

export class RequestPhoneNumberVerificationDto {
  @IsPhoneNumber()
  phoneNumber: string;
}

export class VerifyPhoneNumberDto extends RequestPhoneNumberVerificationDto {
  @IsString()
  @IsNumberString()
  @IsNotEmpty()
  otp: string;
}
