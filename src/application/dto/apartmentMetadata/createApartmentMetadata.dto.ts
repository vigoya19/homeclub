import { IsInt, IsString, IsUrl } from 'class-validator';

export class CreateApartmentMetadataDto {
  @IsInt()
  code: number;

  @IsString()
  description: string;

  @IsUrl()
  imageUrl: string;
}
