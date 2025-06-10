import { CreateApartmentDto } from "src/application/dto/apartment/createApartment.dto";
import { ApartmentEntity } from "src/domain/apartment/apartment.entity";
import { IApartmentRepository } from "src/domain/apartment/apartment.repository";


export class CreateApartmentUseCase {
  constructor(private readonly apartmentRepository: IApartmentRepository) {}

  async execute(dto: CreateApartmentDto): Promise<ApartmentEntity> {
    const newApartment = new ApartmentEntity(
      0, 
      dto.name,
      dto.direction,
      dto.type,
      dto.city,
      dto.country,
      dto.latitude,
      dto.longitude,
      dto.state,
    );
    return this.apartmentRepository.save(newApartment);
  }
}
