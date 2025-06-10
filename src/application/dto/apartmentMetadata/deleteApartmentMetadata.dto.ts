import { IsInt } from 'class-validator';

export class DeleteApartmentMetadataDto {
  @IsInt()
  code: number;
}
