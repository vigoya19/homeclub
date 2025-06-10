import { IsString, IsEnum, IsNumber } from 'class-validator';
import { ApartmentType } from '../../domain/apartment/apartment.type';

export class CreateApartmentDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  country: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsEnum(['active', 'inactive'])
  status: ApartmentType;

  @IsEnum(['corporate', 'tourist'])
  type: ApartmentType;
}