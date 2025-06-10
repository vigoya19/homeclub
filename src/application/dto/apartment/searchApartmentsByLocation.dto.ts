import { IsNumber } from 'class-validator';

export class SearchApartmentsByLocationDto {
  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}
