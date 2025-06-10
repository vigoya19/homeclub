import { ApartmentMetadata } from 'src/domain/apartmentMetadata/apartmentMetadata.entity';
import { IApartmentMetadataRepository } from 'src/domain/apartmentMetadata/apartmentMetadata.repository';

export class GetApartmentMetadataUseCase {
  constructor(private readonly metadataRepo: IApartmentMetadataRepository) {}

  async execute(code: number): Promise<ApartmentMetadata> {
    const exists = await this.metadataRepo.findByCode(code);
    if (!exists) throw new Error('Metadata not found');
    return exists;
  }
}