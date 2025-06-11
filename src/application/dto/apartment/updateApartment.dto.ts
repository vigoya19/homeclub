import { IsOptional, IsString, IsEnum, IsNumber, IsLatitude, IsLongitude } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApartmentType } from 'src/domain/apartment/apartment.type';

export class UpdateApartmentDto {
  @ApiPropertyOptional({
    example: 'Apartamento Ejecutivo',
    description: 'Nombre del apartamento'
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'Calle 100 #10-20',
    description: 'Dirección física del apartamento'
  })
  @IsOptional()
  @IsString()
  direction?: string;

  @ApiPropertyOptional({
    example: 'corporativo',
    description: 'Tipo de apartamento (corporativo o turistico)',
    enum: ApartmentType,
  })
  @IsOptional()
  @IsEnum(ApartmentType)
  type?: ApartmentType;

  @ApiPropertyOptional({
    example: 'Bogotá',
    description: 'Ciudad donde está ubicado el apartamento'
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({
    example: 'Colombia',
    description: 'País donde está ubicado el apartamento'
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({
    example: 4.654837,
    description: 'Latitud de la ubicación'
  })
  @IsOptional()
  @IsNumber()
  @IsLatitude()
  latitude?: number;

  @ApiPropertyOptional({
    example: -74.093071,
    description: 'Longitud de la ubicación'
  })
  @IsOptional()
  @IsNumber()
  @IsLongitude()
  longitude?: number;

  @ApiPropertyOptional({
    example: 'active',
    description: 'Estado del apartamento (activo o no activo)',
    enum: ['active', 'inactive'],
  })
  @IsOptional()
  @IsEnum(['active', 'inactive'])
  state?: 'active' | 'inactive';
}
