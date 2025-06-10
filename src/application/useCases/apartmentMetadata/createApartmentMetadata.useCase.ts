import { CreateApartmentMetadataDto } from 'src/application/dto/apartmentMetadata/createApartmentMetadata.dto';
import { ApartmentMetadata } from 'src/domain/apartmentMetadata/apartmentMetadata.entity';
import { IApartmentMetadataRepository } from 'src/domain/apartmentMetadata/apartmentMetadata.repository';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class CreateApartmentMetadataUseCase {
  constructor(private readonly metadataRepo: IApartmentMetadataRepository) {}

  async execute(dto: CreateApartmentMetadataDto): Promise<ApartmentMetadata> {
    const exists = await this.metadataRepo.findByCode(dto.code);
    if (exists) throw new BadRequestException('Metadata for this apartment already exists');
    const entity = new ApartmentMetadata(dto.code, dto.description, dto.imageUrl);
    return this.metadataRepo.create(entity);
  }
}