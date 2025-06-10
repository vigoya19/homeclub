import { ApartmentMetadata } from "./apartmentMetadata.entity";

export interface IApartmentMetadataRepository {
    create(metadata: ApartmentMetadata): Promise<ApartmentMetadata>;
    findByCode(code: number): Promise<ApartmentMetadata | null>;
    findByCodes(codes: number[]): Promise<ApartmentMetadata[]>;
    update(metadata: ApartmentMetadata): Promise<ApartmentMetadata>;
    delete(code: number): Promise<void>;
    findAll(): Promise<ApartmentMetadata[]>;
    
    
  }
  