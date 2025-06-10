import { IsString, IsEnum, IsNumber, IsLatitude, IsLongitude } from 'class-validator';

import { ApartmentType } from 'src/domain/apartment/apartment.type';


export class CreateApartmentDto {
  @IsString()
  name: string;

  @IsString()
  direction: string;

  @IsEnum(ApartmentType)
  type: ApartmentType;

  @IsString()
  city: string;

  @IsString()
  country: string;

  @IsNumber()
  @IsLatitude()
  latitude: number;

  @IsNumber()
  @IsLongitude()
  longitude: number;

  @IsEnum(['active', 'inactive'])
  state: 'active' | 'inactive';
}
