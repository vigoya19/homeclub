import { IsInt, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApartmentMetadataDto {
  @ApiProperty({
    example: 1,
    description: 'Código único del apartamento (debe coincidir con el código de la base de datos principal)'
  })
  @IsInt()
  code: number;

  @ApiProperty({
    example: 'Apartamento espacioso con vista a la ciudad',
    description: 'Descripción detallada de la propiedad'
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'https://cdn.homeclub.com/aptos/1.jpg',
    description: 'URL de la imagen principal de la propiedad'
  })
  @IsUrl()
  imageUrl: string;
}
