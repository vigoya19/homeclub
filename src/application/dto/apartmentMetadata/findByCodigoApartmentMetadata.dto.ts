import { IsInt } from 'class-validator';

export class FindByCodigoApartmentMetadataDto {
  @IsInt()
  code: number;
}