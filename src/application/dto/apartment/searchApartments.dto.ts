import { IsNumber, IsOptional, IsEnum, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApartmentType } from 'src/domain/apartment/apartment.type';

export class SearchApartmentsDto {
  @ApiProperty({
    example: 4.654837,
    description: 'Latitud de la ubicación para buscar apartamentos cercanos'
  })
  @Type(() => Number)
  @IsNumber()
  latitude: number;

  @ApiProperty({
    example: -74.093071,
    description: 'Longitud de la ubicación para buscar apartamentos cercanos'
  })
  @Type(() => Number)
  @IsNumber()
  longitude: number;

  @ApiPropertyOptional({
    example: ['corporativo', 'turistico'],
    description: 'Filtra por tipo de apartamento (corporativo o turistico). Puede ser uno o ambos.',
    enum: ApartmentType,
    isArray: true
  })
  @IsOptional()
  @IsEnum(ApartmentType, { each: true })
  type?: ApartmentType[];

  @ApiPropertyOptional({
    example: 1000,
    description: 'Precio mínimo para filtrar apartamentos (por día o mes según tipo)'
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minPrice?: number;

  @ApiPropertyOptional({
    example: 5000,
    description: 'Precio máximo para filtrar apartamentos (por día o mes según tipo)'
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxPrice?: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'Página actual para paginación (por defecto 1)',
    default: 1,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    example: 10,
    description: 'Cantidad de resultados por página (por defecto 10)',
    default: 10,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize?: number = 10;
}
