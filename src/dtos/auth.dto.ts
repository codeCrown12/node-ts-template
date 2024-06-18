import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { TransformToLowerCase, TrimSpaces } from '../validations';

export class LoginDto {
  @TransformToLowerCase()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class EmailOtpDto {
  @IsEmail()
  @IsNotEmpty()
  @TransformToLowerCase()
  @TrimSpaces()
  email: string;
}

export class SetPasswordDto {
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SetUsernameDto {
  @IsString()
  @IsNotEmpty()
  @TransformToLowerCase()
  @TrimSpaces()
  username: string;
}

export class ResetPasswordDto {
  @TransformToLowerCase()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  otp: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class VerifyEmailDto {
  @TransformToLowerCase()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  otp: string;
}
