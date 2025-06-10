import { IsInt, IsNumber, IsDateString, IsIn } from 'class-validator';

export class CreateTariffDto {
  @IsInt()
  apartmentId: number;

  @IsDateString()
  dateStart: string;

  @IsDateString()
  dateEnd: string;

  @IsNumber()
  amount: number;

  @IsIn(['mensual', 'diaria'])
  unit: 'mensual' | 'diaria';
}
