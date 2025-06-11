import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteApartmentMetadataDto {
  @ApiProperty({
    example: 1,
    description: 'Código único del apartamento a eliminar (debe coincidir con el código de la base de datos principal)'
  })
  @IsInt()
  code: number;
}
