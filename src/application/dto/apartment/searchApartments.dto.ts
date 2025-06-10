import { IsNumber, IsOptional, IsEnum, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApartmentType } from 'src/domain/apartment/apartment.type';

export class SearchApartmentsDto {
  @Type(() => Number)
  @IsNumber()
  latitude: number;

  @Type(() => Number)
  @IsNumber()
  longitude: number;

  @IsOptional()
  @IsEnum(ApartmentType, { each: true })
  type?: ApartmentType[];

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize?: number = 10;
}
