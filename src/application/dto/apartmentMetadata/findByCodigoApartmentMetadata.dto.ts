import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindByCodigoApartmentMetadataDto {
  @ApiProperty({
    example: 1,
    description: 'Código único del apartamento para buscar la metadata correspondiente (debe coincidir con el código de la base de datos principal)'
  })
  @IsInt()
  code: number;
}
