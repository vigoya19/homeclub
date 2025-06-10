import { ApartmentEntity } from './apartment.entity';
import { ApartmentType } from './apartment.type';

export interface IApartmentRepository {
  save(apartment: ApartmentEntity): Promise<ApartmentEntity>;

  findById(id: number): Promise<ApartmentEntity | null>;

  findAllActive(): Promise<ApartmentEntity[]>
  
  update(apartment: ApartmentEntity): Promise<ApartmentEntity>;

}
