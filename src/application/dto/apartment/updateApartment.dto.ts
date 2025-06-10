import { IsOptional, IsString, IsEnum, IsNumber, IsLatitude, IsLongitude } from 'class-validator';
import { ApartmentType } from 'src/domain/apartment/apartment.type';
// updateApartment.dto.ts
export class UpdateApartmentDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  direction?: string;

  @IsOptional()
  @IsEnum(ApartmentType)
  type?: ApartmentType;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsNumber()
  @IsLatitude()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  @IsLongitude()
  longitude?: number;

  @IsOptional()
  @IsEnum(['active', 'inactive'])
  state?: 'active' | 'inactive';
}
