import { IsString, IsEnum, IsNumber, IsLatitude, IsLongitude } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { ApartmentType } from 'src/domain/apartment/apartment.type';

export class CreateApartmentDto {
  @ApiProperty({
    example: 'Apartamento Ejecutivo',
    description: 'Nombre del apartamento'
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Calle 100 #10-20',
    description: 'Dirección física del apartamento'
  })
  @IsString()
  direction: string;

  @ApiProperty({
    example: 'corporativo',
    description: 'Tipo de apartamento (corporativo o turistico)',
    enum: ApartmentType,
  })
  @IsEnum(ApartmentType)
  type: ApartmentType;

  @ApiProperty({
    example: 'Bogotá',
    description: 'Ciudad donde está ubicado el apartamento'
  })
  @IsString()
  city: string;

  @ApiProperty({
    example: 'Colombia',
    description: 'País donde está ubicado el apartamento'
  })
  @IsString()
  country: string;

  @ApiProperty({
    example: 4.654837,
    description: 'Latitud de la ubicación'
  })
  @IsNumber()
  @IsLatitude()
  latitude: number;

  @ApiProperty({
    example: -74.093071,
    description: 'Longitud de la ubicación'
  })
  @IsNumber()
  @IsLongitude()
  longitude: number;

  @ApiProperty({
    example: 'active',
    description: 'Estado del apartamento (activo o no activo)',
    enum: ['active', 'inactive'],
  })
  @IsEnum(['active', 'inactive'])
  state: 'active' | 'inactive';
}
