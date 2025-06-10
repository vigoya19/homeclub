import { IsInt, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateApartmentMetadataDto {
  @IsInt()
  code: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}