import { IsInt, IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateApartmentMetadataDto {
  @ApiProperty({
    example: 1,
    description: 'Código único del apartamento a actualizar (debe coincidir con el código de la base de datos principal)'
  })
  @IsInt()
  code: number;

  @ApiPropertyOptional({
    example: 'Apartamento renovado con terraza amplia',
    description: 'Nueva descripción de la propiedad (opcional)'
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 'https://cdn.homeclub.com/aptos/1-new.jpg',
    description: 'Nueva URL de la imagen principal de la propiedad (opcional)'
  })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}
