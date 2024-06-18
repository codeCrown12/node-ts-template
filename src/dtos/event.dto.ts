import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import {
  EventType,
  EventFrequency,
  EventVisibility,
} from '@prisma/client';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  free: boolean;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsBoolean()
  @IsNotEmpty()
  stockUnlimited: boolean;

  @IsNumber()
  @IsOptional()
  stock?: number;
}

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  coverPhoto: string;

  @IsEnum(EventType)
  type: EventType;

  @IsString()
  @IsOptional()
  meetingLink?: string;

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
  @IsNotEmpty()
  saleStartDate?: string;

  @IsString()
  @IsNotEmpty()
  saleEndDate?: string;

  @IsString()
  @IsNotEmpty()
  startDate: string;

  @IsString()
  @IsNotEmpty()
  endDate: string;

  @IsBoolean()
  @IsNotEmpty()
  hasAgeRestriction: boolean;

  @IsEnum(EventVisibility)
  visibility: EventVisibility;

  @IsEnum(EventFrequency)
  frequency: EventFrequency;

  @IsString()
  @IsNotEmpty()
  tags: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateTicketDto)
  tickets: CreateTicketDto[];
}

export class GetEventDto {
  @IsString()
  @IsOptional()
  limit?: string;

  @IsString()
  @IsOptional()
  cursor?: string;

  @IsString()
  @IsOptional()
  frequency?: string;

  @IsString()
  @IsOptional()
  type?: string;

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
  search?: string;
}

export class GetBookingDto {
  @IsString()
  @IsOptional()
  limit?: string;

  @IsString()
  @IsOptional()
  cursor?: string;
}

export class EditEventDto {
  @IsUUID()
  eventId: string;

  @IsOptional()
  @IsEnum(EventType)
  type?: EventType;

  @IsOptional()
  @IsEnum(EventVisibility)
  visibility?: EventVisibility;

  @IsOptional()
  @IsEnum(EventFrequency)
  frequency?: EventFrequency;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  coverPhoto?: string;

  @IsString()
  @IsOptional()
  meetingLink?: string;

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
  saleStartDate?: string;

  @IsString()
  @IsOptional()
  saleEndDate?: string;

  @IsString()
  @IsOptional()
  startDate: string;

  @IsString()
  @IsOptional()
  endDate: string;

  @IsBoolean()
  @IsOptional()
  hasAgeRestriction?: boolean;

  @IsString()
  @IsOptional()
  tags?: string;
}

export class EditTicketDto {
  @IsUUID()
  ticketId: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isAvailableForSale?: boolean;
}