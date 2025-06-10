import { UpdateApartmentMetadataDto } from 'src/application/dto/apartmentMetadata/updateApartmentMetadata.dto';
import { IApartmentMetadataRepository } from 'src/domain/apartmentMetadata/apartmentMetadata.repository';

export class UpdateApartmentMetadataUseCase {
  constructor(private readonly metadataRepo: IApartmentMetadataRepository) {}

  async execute(dto: UpdateApartmentMetadataDto) {
    const exists = await this.metadataRepo.findByCode(dto.code);
    if (!exists) throw new Error('Metadata not found');
    if (dto.description !== undefined) exists.description = dto.description;
    if (dto.imageUrl !== undefined) exists.imageUrl = dto.imageUrl;
    return this.metadataRepo.update(exists);
  }
}