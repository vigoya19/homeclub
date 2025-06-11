import { IsInt, IsNumber, IsDateString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTariffDto {
  @ApiProperty({
    example: 1,
    description: 'ID del apartamento al que pertenece esta tarifa'
  })
  @IsInt()
  apartmentId: number;

  @ApiProperty({
    example: '2025-01-01',
    description: 'Fecha de inicio de vigencia de la tarifa (YYYY-MM-DD)'
  })
  @IsDateString()
  dateStart: string;

  @ApiProperty({
    example: '2025-03-31',
    description: 'Fecha de fin de vigencia de la tarifa (YYYY-MM-DD)'
  })
  @IsDateString()
  dateEnd: string;

  @ApiProperty({
    example: 3000,
    description: 'Monto de la tarifa (puede ser mensual o diaria según el tipo de apartamento)'
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: 'mensual',
    description: 'Unidad de la tarifa ("mensual" para apartamentos corporativos, "diaria" para turísticos)',
    enum: ['mensual', 'diaria'],
  })
  @IsIn(['mensual', 'diaria'])
  unit: 'mensual' | 'diaria';
}
