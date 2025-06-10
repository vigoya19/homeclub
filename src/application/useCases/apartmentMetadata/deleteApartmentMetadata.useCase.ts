import { IApartmentMetadataRepository } from "src/domain/apartmentMetadata/apartmentMetadata.repository";

export class DeleteApartmentMetadataUseCase {
  constructor(private readonly metadataRepo: IApartmentMetadataRepository) {}

  async execute(code: number) {
    const exists = await this.metadataRepo.findByCode(code);
    if (!exists) throw new Error('Metadata not found');
    await this.metadataRepo.delete(code);
    return true;
  }
}